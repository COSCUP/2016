// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');
var Remarkable= require('remarkable');

// Include dependency
var Navbar    = require('components/navbar.js');
var Footer    = require('components/footer.js');
var Seperator = require('components/seperator.js');
var langStore = require('stores/lang.js');
var loader    = require('dataloaders/sponsor.js');

var specialthank = require('json/special-thank.json');

function markup(text) {
    var md       = new Remarkable();
    var markdown = md.render(text);
    return { __html: markdown};
}


// Implement index page
var Sponsor = React.createClass({
    render: function() {
        var data = this.props.data;
        var lang = this.props.lang;
        var markdown = markup(data.description[lang]);
        return (
            <section role="sponsor">
                <div role="sponsor-logo">
                    <a href={data.url} target="_blank">
                        <img src={data.logoUrl} />
                    </a>
                </div>
                <div role="sponsor-text">
                    <header>{data.name[lang]}</header>
                    <article dangerouslySetInnerHTML={markdown} />
                </div>
                <div role="clear-float"></div>
            </section>
        );
    }
});

var SponsorClass = React.createClass({
    render: function() {
        var data     = this.props.data;
        var lang     = this.props.lang;
        var sponsors = data.sponsors.map(function(sponsor, idx) {
            return (
                <Sponsor
                    key={sponsor.name['en']} 
                    data={sponsor}
                    lang={lang} />
            );
        });
        return (
            <section role="sponsor-class">
                <header>{data.className[lang]}</header>
                {sponsors}
            </section>
        );
    }
});

var SpecialthankClass = React.createClass({
    componentDidMount: function() {
        if( location.hash === '#special-thank' )
            ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth"});
    },
    render: function() {
        var lang = this.props.lang;
        return (
            <section role="sponsor-class">
                <header ref="special-thank">{specialthank.header[lang]}</header>

                <article role="special-thank">
                    {specialthank.contents[lang].map((content, idx)=>{
                        return <p key={lang + idx}>{content}</p>
                    })}
                    <p>{specialthank.list}</p>
                </article>
            </section>
        );
    }
});

var Sponsorlist = React.createClass({
    getInitialState: function() {
        return {lang: langStore.getState(), loaded: false};
    },
    changeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    onloadHandler: function() {
        this.setState({loaded: true});
    },
    componentDidMount: function() {
        langStore.register(this.changeHandler);
        loader.register(this.onloadHandler);
    },
    render: function() {
        var datas  = loader.getData();
        var lang   = this.state.lang;
        var levels = datas.map(function(level, idx) {
            return (
                <SponsorClass
                    key={idx} 
                    data={level}
                    lang={lang} />
            );
        });
        levels.splice(6, 0, <SpecialthankClass lang={lang} />);
        return (
            <section role="sponsor-list">
                {levels}
            </section>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />

                <Sponsorlist />

                <Seperator />

                <section role="explain-sponsor">
                    <h2> 贊助COSCUP </h2>
                    <p> 如果您欲贊助 COSCUP，請與 <a href="mailto: sponsorship@coscup.org">sponsorship@coscup.org</a> 聯絡。</p> 
                </section>


                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('react-root')
)
