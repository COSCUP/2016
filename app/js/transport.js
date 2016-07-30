// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');

// Include dependency
var Navbar       = require('components/navbar.js');
var Seperator    = require('components/seperator.js');
var TransportMap = require('components/transportmap.js')
var Sponsors     = require('components/footer-sponsor.js');
var Footer       = require('components/footer.js');

// Implement index page
var Main = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />

                <TransportMap />

                <Seperator />

                <Sponsors />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('react-root')
)
