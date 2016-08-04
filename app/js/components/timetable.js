// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');

// Include dependency
var TimetableHSSB   = require('components/timetable-partial/timetable-hssb.js');
var TimetableGYM    = require('components/timetable-partial/timetable-gym.js');
var TimetableFilter = require('components/timetable-partial/timetable-filter.js');
var typeStore       = require('stores/timetable-filter.js');

var loader   = require('dataloaders/schedules.js');
var timeData = require('json/time.json');
var lightningData = require('json/lightning.json');

lightningData.day1 = lightningData.day1.map((talk) => {
    if( talk.speaker.trim() !== '' )
        return (
            <p className="lightning-talk">
                <span className="speaker">{talk.speaker}</span>
                <span>{talk.topic}</span>
            </p>
        );
    else
        return <span />;
});
lightningData.day2 = lightningData.day2.map((talk) => {
    if( talk.speaker.trim() !== '' )
        return (
            <p className="lightning-talk">
                <span className="speaker">{talk.speaker}</span>
                <span>{talk.topic}</span>
            </p>
        );
    else
        return <span />;
});

// Implement index page
var Timetable = React.createClass({
    dataOnloadHandler: function() {
        this.forceUpdate();
    },
    changeHandler: function(nowPlace) {
        if( nowPlace==1 ) {
            ReactDOM.findDOMNode(this.refs.gym) .style.display = 'block';
            ReactDOM.findDOMNode(this.refs.hssb).style.display = 'none';
        }
        else {
            ReactDOM.findDOMNode(this.refs.gym) .style.display = 'none';
            ReactDOM.findDOMNode(this.refs.hssb).style.display = 'block';
        }
    },
    componentDidMount: function() {
        loader.register(this.dataOnloadHandler);
        typeStore.placeChangeRegister(this.changeHandler);

        // decide initial state
        this.changeHandler(typeStore.nowPlace());
    },
    render: function() {
        return (
            <section role="timetable">
                <TimetableFilter />
                <TimetableHSSB ref="hssb"
                    data={loader.getHssbData()}
                    timeData={timeData}
                    roomData={loader.getHssbRoom()}
                    lightningData={lightningData} />
                <TimetableGYM  ref="gym"
                    data={loader.getGymData()} 
                    timeData={timeData}
                    roomData={loader.getGymRoom()}
                    lightningData={lightningData} />
            </section>
        );
    }
});

module.exports = Timetable;
