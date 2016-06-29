// Include library
require('lib/arrayExtended.js');
var React     = require('react');
var ReactDOM  = require('react-dom');
var dom       = require('lib/dom.js');
var classNames = require('classnames');

// Include dependency
var navbarDt  = require('json/navbar.json');
var Bugar     = require('components/bugar.js');
var langStore = require('stores/lang.js');
var resizer   = require('stores/onresize.js');
var scroller  = require('stores/onscroll.js');


// Implement navbar banner
var LangSwitch = React.createClass({
    getInitialState: function() {
        return {lang: langStore.getState()};
    },
    langChangeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    handleClickZH: function() {
        langStore.setLang('zh');
    },
    handleClickEN: function() {
        langStore.setLang('en');
    },
    componentDidMount: function() {
        langStore.register(this.langChangeHandler);
    },
    render: function() {
        var lang = this.state.lang;
        var zhClass = (lang=='zh')? 'active' : 'unactive';
        var enClass = (lang=='en')? 'active' : 'unactive';
        var version = this.props.version || '';
        return (
            <nav role="lang-switch" className={version}>
                <span onClick={this.handleClickEN}
                        className={enClass}>
                    EN
                </span>
                <span role="seperator">/</span>
                <span onClick={this.handleClickZH}
                        className={zhClass}>
                    繁體中文
                </span>
            </nav>
        );
    }
});

var Links = React.createClass({
    getInitialState: function() {
        return {lang: langStore.getState(), top: scroller.top()};
    },
    changeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    componentDidMount: function() {
        langStore.register(this.changeHandler);
    },
    render: function() {
        var lang = this.state.lang;
        var href = window.location.href.split("/").back();

        if( href === '' )
            href = 'index.html';
        var lis  = navbarDt.map(function(pages, id) {
            var active = (href===pages.url)? 'active' : '';
            return (
                <li key={id} className={active}>
                    <a href={pages.url}>
                        {pages.text[lang]}
                    </a>
                    <div role="green-bar"></div>
                </li>
            );
        });
        return (
            <ul>
                {lis}
                <LangSwitch version="rwd" />
            </ul>
        );
    }
});

var Navbar = React.createClass({
    coculateHeight: function() {
        if( !this.props.full )
            return 'auto';
        else if( resizer.windowWidth() > 1500 )
            return (resizer.windowWidth()*0.3) + 'px';
        else if( resizer.windowWidth() > 900 )
            return (resizer.windowWidth()*0.45) + 'px';
        else if( resizer.windowWidth() > 600 )
            return (resizer.windowWidth()*0.5) + 'px';
        else
            return (resizer.windowWidth()*0.7) + 'px';
    },
    coculateClassName: function() {
        var wd = resizer.windowWidth();
        return classNames({
            'banner-rwd-1500': wd > 900,
            'banner-rwd-900' : wd <= 900,
            'non-full'       : !this.props.full
        });
    },
    coculateState: function() {
        return {
            height: this.coculateHeight(),
            cName : this.coculateClassName()
        };
    },
    navbarAdjust: function() {
        var navbarHeight = ReactDOM.findDOMNode(this).offsetHeight;
        var linksHeight = ReactDOM.findDOMNode(this.refs.links).offsetHeight;
        if( this.state.cName !== ''
            || scroller.top() > navbarHeight - linksHeight){
            ReactDOM.findDOMNode(this.refs.links).style.position = "fixed";
            ReactDOM.findDOMNode(this.refs.links).style.top = "0px";
            ReactDOM.findDOMNode(this.refs.links).style.bottom = "auto";
        } else {
            ReactDOM.findDOMNode(this.refs.links).style.position = "absolute";
            ReactDOM.findDOMNode(this.refs.links).style.top = "auto";
            ReactDOM.findDOMNode(this.refs.links).style.bottom = "0px";
        }
    },
    getInitialState: function() {
        return this.coculateState();
    },
    resizeHandler: function() {
        this.setState(this.coculateState());
        this.navbarAdjust();
    },
    scrollHandler: function() {
        this.navbarAdjust();
    },
    componentDidMount: function() {
        resizer.register(this.resizeHandler);
        scroller.register(this.scrollHandler);
        this.navbarAdjust();
    },
    render: function() {
        var style = {height: this.state.height};
        var cName = this.state.cName;
        return (
            <nav role="banner" style={style} className={cName}>
                <header>
                    <img role="up-hero-line" src="images/hero_line.svg" />
                    <img role="logo" src="images/coscup.svg" />
                    <strong>開源人年會</strong>
                    {(() => {
                        if( this.props.full )
                            return <img role="slogan" src="images/main_withslogan.svg" />;
                        else return <span />
                    })()}

                    <LangSwitch />
                    
                    <img role="btn-hero-line" src="images/hero_line.svg" />                    
                </header>

                <section ref="links" role="page-links">
                    <Bugar />
                    <img role="logo" src="images/coscup.svg" />
                    <Links />
                    <div role="clear-float"></div>
                </section>
            </nav>
        );
    }
});

module.exports = Navbar;
