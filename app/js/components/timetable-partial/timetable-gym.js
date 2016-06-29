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
                    <th>{room["H0"]["name"+lang]}</th>
                    <th>{room["H1"]["name"+lang]}</th>
                    <th>{room["HP"]["name"+lang]}</th>
                    <th>{room["H2"]["name"+lang]}</th>
                    <th>{room["H3"]["name"+lang]}</th>
                    <th>{room["H4"]["name"+lang]}</th>
                </tr>
                <tr>
                    <td role="time-col">{time[0]}</td>
                    <td colSpan="2" role="hardcode-col">Opening</td>
                    <td rowSpan="2" role="empty-slot"></td>
                    <Slot rowSpan="4" data={data["H21"]} lang={lang} />
                    <Slot rowSpan="4" data={data["H31"]} lang={lang} />
                    <Slot rowSpan="4" data={data["H41"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[1]}</td>
                    <Slot colSpan="2" data={data["K0"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H21"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H31"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H41"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[2]}</td>
                    <Slot data={data["H01"]} lang={lang} />
                    <Slot data={data["H11"]} lang={lang} />
                    <Slot rowSpan="2" data={data["HP1"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H21"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H31"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H41"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[3]}</td>
                    <Slot data={data["H02"]} lang={lang} />
                    <Slot data={data["H12"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["HP1"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H21"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H31"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H41"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[4]}</td>
                    <Slot data={data["H03"]} lang={lang} />
                    <Slot data={data["H13"]} lang={lang} />
                    <Slot rowSpan="4" data={data["HP2"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H22"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H32"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H42"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[5]}</td>
                    <Slot data={data["H04"]} lang={lang} />
                    <Slot data={data["H14"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["HP2"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H22"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H32"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H42"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[6]}</td>
                    <Slot data={data["H05"]} lang={lang} />
                    <Slot data={data["H15"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["HP2"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H22"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H32"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H42"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[7]}</td>
                    <Slot colSpan="2" data={data["K1"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["HP2"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[8]}</td>
                    <td colSpan="2" role="hardcode-col">Lighting Talk</td>
                </tr>
                <tr>
                    <td role="time-col">{time[9]}</td>
                    <td colSpan="2" role="hardcode-col">BoF Announcement</td>
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
                    <th>{room["H0"]["name"+lang]}</th>
                    <th>{room["H1"]["name"+lang]}</th>
                    <th>{room["HP"]["name"+lang]}</th>
                    <th>{room["H2"]["name"+lang]}</th>
                    <th>{room["H3"]["name"+lang]}</th>
                    <th>{room["H4"]["name"+lang]}</th>
                </tr>
                <tr>
                    <td role="time-col">{time[0]}</td>
                    <td colSpan="2" role="hardcode-col">Announcement</td>
                    <td rowSpan="2" role="empty-slot"></td>
                    <Slot rowSpan="4" data={data["H23"]} lang={lang}></Slot>
                    <Slot rowSpan="4" data={data["H33"]} lang={lang}></Slot>
                    <Slot rowSpan="4" data={data["H43"]} lang={lang}></Slot>
                </tr>
                <tr>
                    <td role="time-col">{time[1]}</td>
                    <Slot colSpan="2" data={data["K2"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H23"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H33"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H43"]} lang={lang}></Slot>
                </tr>
                <tr>
                    <td role="time-col">{time[2]}</td>
                    <Slot data={data["H06"]} lang={lang} />
                    <Slot data={data["H16"]} lang={lang} />
                    <Slot rowSpan="2" data={data["HP3"]} lang={lang}/>
                    <Slot rwdOnly={true} data={data["H23"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H33"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H43"]} lang={lang}></Slot>
                </tr>
                <tr>
                    <td role="time-col">{time[3]}</td>
                    <Slot data={data["H07"]} lang={lang} />
                    <Slot data={data["H17"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H23"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H33"]} lang={lang}></Slot>
                    <Slot rwdOnly={true} data={data["H43"]} lang={lang}></Slot>
                </tr>
                <tr>
                    <td role="time-col">{time[4]}</td>
                    <Slot data={data["H08"]} lang={lang} />
                    <Slot data={data["H18"]} lang={lang} />
                    <Slot rowSpan="2" data={data["HP4"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H24"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H34"]} lang={lang} />
                    <Slot rowSpan="3" data={data["H44"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[5]}</td>
                    <Slot data={data["H09"]} lang={lang} />
                    <Slot data={data["H19"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["HP4"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H24"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H34"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H44"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[6]}</td>
                    <Slot rwdOnly={true} data={data["H24"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H34"]} lang={lang} />
                    <Slot rwdOnly={true} data={data["H44"]} lang={lang} />
                </tr>
                <tr>
                    <td role="time-col">{time[7]}</td>
                </tr>
                <tr>
                    <td role="time-col">{time[8]}</td>
                </tr>
            </tbody>
        );
    }
});

// Implement index page
var TimetableGYM = React.createClass({
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
            <div role="timetabel-gym">
                <table>
                    <TbodyDay1
                        data={this.props.data}
                        timeData={this.props.timeData["day1"]}
                        roomData={this.props.roomData}
                        lang={this.state.lang} />
                </table>
                <table>
                    <TbodyDay2
                        data={this.props.data}
                        timeData={this.props.timeData["day2"]}
                        roomData={this.props.roomData}
                        lang={this.state.lang} />
                </table>
            </div>
        );
    }
});

module.exports = TimetableGYM;
