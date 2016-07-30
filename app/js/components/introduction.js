// Include library
var React     = require('react');
var Remarkable= require('remarkable');

// Include dependency
var pageText  = require('json/index-page.json');
var langStore = require('stores/lang.js');
var Seperator = require('components/seperator.js');
var Article   = require('components/article.js');

function markup(text) {
    var md       = new Remarkable();
    var markdown = md.render(text);
    return { __html: markdown};
}

var Activity  = React.createClass({
    render: function() {
        var lContent = [];
        var rContent = [];
        var article;
        if( this.props.left ) {
            article = markup(this.props.left.article);
            lContent.push(<h2>{this.props.left.title}</h2>);
            lContent.push(<p dangerouslySetInnerHTML={article} />);
            lContent.push(  <a role="link-btn"
                               href={this.props.left.url}
                               target="_blank">
                                {this.props.left.btn}
                            </a>);
        }
        if( this.props.right ) {
            article = markup(this.props.right.article);
            rContent.push(<h2>{this.props.right.title}</h2>);
            rContent.push(<p dangerouslySetInnerHTML={article} />);
            rContent.push(  <a role="link-btn"
                               href={this.props.right.url}
                               target="_blank">
                                {this.props.right.btn}
                            </a>);
        }
        return (
            <section role="activity-gate">
                <article role="left">
                    {lContent}  
                </article>
                <article role="right">
                    {rContent}
                </article>
                <div role="clear-float"></div>
            </section>
        );
    }
});

// Implement index page introduction
var Introduction = React.createClass({
    getInitialState: function() {
        return {lang: langStore.getState()};
    },
    changeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    componentDidMount: function() {
        langStore.register(this.changeHandler);
    },
    render: function() {
        var lang = this.state.lang;
        var introduction = pageText.introduction[lang];
        var activitys    = pageText.activity[lang];
        var activitysRow = [];
        var idx = 0;
        while( idx<activitys.length ) {
            if( idx+1 < activitys.length )
                activitysRow.push(
                    <Activity key={lang + idx}
                        left ={activitys[idx]}
                        right={activitys[idx+1]}/>
                );
            else
                activitysRow.push(
                    <Activity key={lang + idx}
                        left ={activitys[idx]}/>
                );
            idx += 2;
        }
        return (
            <section role="index-body">

                <article role="important-info">
                    <strong>{"2016/8/20(六) - 2016/8/21(日)"}</strong>
                    <p>{"中央研究院 活動中心及人文社會科學館"}</p>
                    <p>{"Activity Center & HSSB, Academia Sinica"}</p>
                </article>

                <Seperator />

                {activitysRow}

                <Seperator />

                <Article data={introduction} />

                <Seperator />
                
            </section>
        );
    }
});

module.exports = Introduction;
