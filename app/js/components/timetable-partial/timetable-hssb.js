// Include library
var React = require('react');

// Include dependency
var langStore = require('stores/lang.js');
var Slot      = require('components/timetable-partial/timetable-slot.js');

var TbodyDay1 = React.createClass({
    render: function() {
        var lang = this.props.lang;
        var data = this.props.data;
        var time = this.props.timeData;
        var room = this.props.roomData;
        return (
            <tbody>
                <tr>
                    <th role="time-col">08 / 20</th>
                    <th>{room["R0"]["name"+lang]}</th>
                    <th>{room["R1"]["name"+lang]}</th>
                    <th>{room["R2"]["name"+lang]}</th>
                </tr>
                <tr>
                    <td role="time-col">{time[0]}</td>
                    <td colSpan="3" role="hardcode-col">Opening</td>
                </tr>
                <tr>
                    <td role="time-col">{time[1]}</td>
                    <Slot colSpan="3" data={data["K0"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[2]}</td>
                    <Slot data={data["R01"]} lang={lang} />
                    <Slot data={data["R11"]} lang={lang} />
                    <Slot data={data["R21"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[3]}</td>
                    <Slot data={data["R02"]} lang={lang} />
                    <Slot data={data["R12"]} lang={lang} />
                    <Slot data={data["R22"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[4]}</td>
                    <Slot data={data["R03"]} lang={lang} />
                    <Slot data={data["R13"]} lang={lang} />
                    <Slot data={data["R23"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[5]}</td>
                    <Slot data={data["R04"]} lang={lang} />
                    <Slot data={data["R14"]} lang={lang} />
                    <Slot data={data["R24"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[6]}</td>
                    <Slot data={data["R05"]} lang={lang} />
                    <Slot data={data["R15"]} lang={lang} />
                    <Slot data={data["R25"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[7]}</td>
                    <Slot colSpan="3" data={data["K1"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[8]}</td>
                    <td colSpan="3" role="hardcode-col">
                        Lightning Talk
                        {this.props.lightningTalks}
                    </td>
                </tr>
                <tr>
                    <td role="time-col">{time[9]}</td>
                    <td colSpan="3" role="hardcode-col">BoF Announcement</td>
                </tr>
            </tbody>
        );
    }
});

var TbodyDay2 = React.createClass({
    render: function() {
        var lang = this.props.lang;
        var data = this.props.data;
        var time = this.props.timeData;
        var room = this.props.roomData;
        return (
            <tbody>
                <tr>
                    <th role="time-col">08 / 21</th>
                    <th>{room["R0"]["name"+lang]}</th>
                    <th>{room["R1"]["name"+lang]}</th>
                    <th>{room["R2"]["name"+lang]}</th>
                </tr>
                <tr>
                    <td role="time-col">{time[0]}</td>
                    <td colSpan="3" role="hardcode-col">Announcement</td>
                </tr>
                <tr>
                    <td role="time-col">{time[1]}</td>
                    <Slot colSpan="3" data={data["K2"]} lang={lang} />
                </tr>
                <tr>
                    <td   rowSpan="2" role="time-col">{time[2]}</td>
                    <Slot rowSpan="2" data={data["R06"]} lang={lang} />
                    <Slot data={data["R161"]} lang={lang} />
                    <Slot rowSpan="2" data={data["R26"]} lang={lang} />
                </tr>
                <tr>
                    <Slot data={data["R162"]} lang={lang} />
                </tr>
                <tr>
                    <td   rowSpan="2" role="time-col">{time[3]}</td>
                    <Slot rowSpan="2" data={data["R07"]} lang={lang} />
                    <Slot data={data["R171"]} lang={lang} />
                    <Slot rowSpan="2" data={data["R27"]} lang={lang} />
                </tr>
                <tr>
                    <Slot data={data["R172"]} lang={lang} />
                </tr>
                <tr>
                    <td   rowSpan="2" role="time-col">{time[4]}</td>
                    <Slot rowSpan="2" data={data["R08"]} lang={lang} />
                    <Slot data={data["R181"]} lang={lang} />
                    <Slot rowSpan="2" data={data["R28"]} lang={lang} />
                </tr>
                <tr>
                    <Slot data={data["R182"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[5]}</td>
                    <Slot data={data["R09"]} lang={lang} />
                    <Slot data={data["R19"]} lang={lang} />
                    <Slot data={data["R29"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[6]}</td>
                    <Slot colSpan="3" data={data["K3"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[7]}</td>
                    <td colSpan="3" role="hardcode-col">
                        Lightning Talk
                        {this.props.lightningTalks}
                    </td>
                </tr>
                <tr>
                    <td role="time-col">{time[8]}</td>
                    <td colSpan="3" role="hardcode-col">Closing</td>
                </tr>
            </tbody>
        );
    }
});

// Implement index page
var TimetableHSSB = React.createClass({
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
        return (
            <div role="timetabel-hssb">
                <table>
                    <TbodyDay1 
                        data={this.props.data} 
                        timeData={this.props.timeData["day1"]} 
                        roomData={this.props.roomData}
                        lang={this.state.lang}
                        lightningTalks={this.props.lightningData.day1} />
                </table>
                <table>
                    <TbodyDay2
                        data={this.props.data} 
                        timeData={this.props.timeData["day2"]} 
                        roomData={this.props.roomData}
                        lang={this.state.lang}
                        lightningTalks={this.props.lightningData.day2} />
                </table>
            </div>
        );
    }
});

module.exports = TimetableHSSB;
