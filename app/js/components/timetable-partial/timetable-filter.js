// Include library
var React     = require('react');

// Include dependency
var loader    = require('dataloaders/schedules-filter.js');
var langStore = require('stores/lang.js');
var typeStore = require('stores/timetable-filter.js');

// Implement index page
var PlaceBtn = React.createClass({
    needActive: function() {
        return typeStore.nowPlace()==this.props.data.id;
    },
    getInitialState: function() {
        return {active: this.needActive()};
    },
    changeHandler: function() {
        this.setState({active: this.needActive()});
    },
    componentDidMount: function() {
        typeStore.placeChangeRegister(this.changeHandler);
    },
    clickHandler: function() {
        typeStore.setPlace(this.props.data.id);
    },
    render: function() {
        var data = this.props.data;
        var lang = this.props.lang;
        var cls  = (this.state.active)? 'active' : '';
        return (
            <button onClick={this.clickHandler} className={cls}>
                {data[lang]}
            </button>
        );
    }
});

var FilterBtn = React.createClass({
    needActive: function() {
        return typeStore.sieve(this.props.data.type);
    },
    getInitialState: function() {
        return {active: this.needActive()};
    },
    changeHandler: function() {
        if( this.state.active != this.needActive() )
            this.setState({active: this.needActive()});
    },
    componentDidMount: function() {
        typeStore.filterChangeRegister(this.changeHandler);
    },
    clickHandler: function() {
        typeStore.filterToggle(this.props.data.type);
    },
    render: function() {
        var data = this.props.data || {};
        var lang = this.props.lang;
        var clk  = (this.state.active)? 'active' : '';
        if( !data['name'+lang] || data['name'+lang]=='' )
            clk  = 'hide';
        return (
            <span onClick={this.clickHandler} className={clk}>
                <div role="light-box"></div>
                {data['name'+lang]}
            </span>
        );
    }
});

var TimetableFilter = React.createClass({
    getInitialState: function() {
        return {
            lang: langStore.getState(),
            filterRwdCls: ''
        };
    },
    onclickHandler: function() {
        var nCls = (this.state.filterRwdCls=='')? 'active' : '';
        this.setState({filterRwdCls: nCls})
    },
    typesOnloadHandler: function() {
        this.forceUpdate();
    },
    changeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    componentDidMount: function() {
        langStore.register(this.changeHandler);
        loader.register(this.typesOnloadHandler);
    },
    render: function() {
        var lang  = this.state.lang;
        var place = typeStore.getAllPlaces();
        var rwdCls= this.state.filterRwdCls;
        var tags  = [];
        var types = typeStore.getAllTypes();
        for(var id in types)
            tags.push(
                <FilterBtn key={lang+id} data={types[id]} lang={lang} />
            );
        return (
            <div role="timetable-filter">
                <header>
                    <PlaceBtn role="left-btn" data={place[0]} lang={lang} />
                    <PlaceBtn role="right-btn" data={place[1]} lang={lang} />
                    <div role="clear-float"></div>
                </header>

                <div role="filter-rwd" className={rwdCls}
                     onClick={this.onclickHandler}>
                    Filter
                    <img src="images/arrow.png" />
                </div>
                <footer>
                    {tags}
                </footer>
            </div>
        );
    }
});

module.exports = TimetableFilter;
