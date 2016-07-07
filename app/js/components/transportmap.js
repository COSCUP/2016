// Include library
require('lib/arrayExtended.js');
var React     = require('react');

// Include dependency
var TransportJsonDt  = require('json/transport.json');
var langStore = require('stores/lang.js');

// Implement navbar banner
var TransportMap = React.createClass({
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
        var lis  = TransportJsonDt.transport.map(function(transport, id) {
            return (
                <section role="transport">
                    <h3 role="title">{transport.title[lang]}
                    </h3>
                    <div role="content">{transport.content[lang]}</div>
                </section>
            );
        });
        return (
            <div>
                <div role="transport-text-info">
                    <section role="transport">
                        <h3 role="title">{TransportJsonDt.location.title[lang]}</h3>
                        <div role="content">{TransportJsonDt.location.content[lang]}</div>
                    </section>
                    <section role="transport">
                        <h3 role="title">{TransportJsonDt.address.title[lang]}</h3>
                        <div role="content">{TransportJsonDt.address.content[lang]}</div>
                    </section>
                    <section role="transport">
                        <h3 role="title">{TransportJsonDt.suggestion[lang]}</h3>
                    </section>
                    {lis}
                </div>
                <div role="transportmap">
                    <iframe width="100%" height="100%" frameBorder="0" src="http://umap.openstreetmap.fr/zh-tw/map/ubike_88883?scaleControl=true&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=false&datalayersControl=false&onLoadPanel=undefined&captionBar=false#14/25.0423/121.6128"></iframe>
                </div>
            </div>
        );
    }
});

module.exports = TransportMap;
