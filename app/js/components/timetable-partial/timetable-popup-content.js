var React     = require('react');
var Remarkable= require('remarkable');

function markup(text) {
    var md       = new Remarkable({html: true});
    var markdown = md.render(text);
    return { __html: markdown};
}

var Content = React.createClass({
    render: function() {
        var data = this.props.data || {};
        var speakerintro = markup(data.speakerintro || '');
        var abstract = markup(data.abstract || '');
        return (
            <section role="timetable-popup-content">
                <header>
                    <strong>{data.speakername}</strong>
                    <article dangerouslySetInnerHTML={speakerintro} />
                </header>
                <footer>
                    <strong>{data.subject}</strong>
                    <article dangerouslySetInnerHTML={abstract} />
                </footer>
            </section>
        );
    }
});

module.exports = Content;
