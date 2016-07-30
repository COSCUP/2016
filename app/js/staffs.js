// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');

// Include dependency
var Navbar    = require('components/navbar.js');
var Seperator = require('components/seperator.js');
var Sponsors  = require('components/footer-sponsor.js');
var Footer    = require('components/footer.js');
var pageText  = require('json/staffs-page.json');

// Implement index page
var Team = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div role="team">
                <h2>{data.team}</h2>
                <p>{data.members.join('，')}</p>
            </div>
        );
    }
});

var Main = React.createClass({
    render: function() {
        var staffs = pageText.map(function(team, idx) {
            return <Team data={team} key={idx} />;
        });
        return (
            <div>
                <Navbar />

                <section role="team-list">
                    {staffs}
                </section>

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
