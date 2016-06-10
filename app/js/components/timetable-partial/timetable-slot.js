// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');

// Include dependency
require('lib/arrayExtended.js');
var Content   = require('components/timetable-partial/timetable-popup-content.js');
var popup     = require('stores/popup-page.js');
var langStore = require('stores/lang.js');
var typeStore = require('stores/timetable-filter.js');
var tagName   = typeStore.type;

// Implement index page
var Slot = React.createClass({
    needActive: function() {
        if( typeStore.filter(-1) )
            return true;
        var types = this.props.data.type || [];
        if( !types.isArray )
            types   = [types];
        for(var tp of types)
            if( typeStore.filter(tp) )
                return true;
        return false;
    },
    getInitialState: function() {
        return {
            lang: langStore.getState(),
            active: this.needActive()
        };
    },
    clickHandler: function() {
        var dom = ReactDOM.findDOMNode(this.refs["popup-content-src"]);
        popup.show(dom.innerHTML);
    },
    langChangeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    filterChangeHandler: function() {
        this.setState({active: this.needActive()});
    },
    componentDidMount: function() {
        langStore.register(this.langChangeHandler);
        typeStore.filterChangeRegister(this.filterChangeHandler);
    },
    render: function() {
        var lang    = this.state.lang;
        var colSpan = this.props.colSpan || 1;
        var rowSpan = this.props.rowSpan || 1;
        var cls     = (this.state.active)? '' : 'unactive';

        // Process tags
        if( !this.props.data )
            return (<td role="empty-slot"></td>);
        var types   = this.props.data.type || [];
        if( !types.isArray )
            types   = [types];
        var tags    = types.map((ele) => {
            return (
                <span role="tag" className={"tag-"+tagName(ele)['nameen']}>
                    {tagName(ele)['name'+lang]}
                </span>
            );
        });
        if( this.props.data.lang === "EN" )
            tags.push(<span role="tag" className="tag-EN">EN</span>);

        var alt = this.props.data.slot[0] == 'K' ? "Keynote" : this.props.data.room.substr(0, 2);
        return (
            <td role="timetable-slot" className={cls}
                colSpan={colSpan} rowSpan={rowSpan}
                onClick={this.clickHandler}
                >

                <div className="speaker" alt={alt}>
                    {this.props.data.speakername}
                </div>
                <div className="subject">
                    {this.props.data.subject}
                </div>
                <div className="tags">
                    {tags}
                </div>
                
                <div ref="popup-content-src">
                    <Content
                        data={this.props.data} />
                </div>
            </td>
        );
    }
});

module.exports = Slot;
