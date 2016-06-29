// Include library
var React    = require('react');
var ReactDOM = require('react-dom');

var langStore = require('stores/lang.js');

// Implement index page
var Clipboard = React.createClass({
	clickHandler: function() {
		var input = ReactDOM.findDOMNode(this.refs.clipboardInput);
		if( input.select ) {
			input.select();
			try {
				document.execCommand('copy');
			}
			catch(err) {
				console.error('Clipboard helper not supported.')
			}
		}
	},
    getInitialState: function() {
        return {lang: langStore.getState()};
    },
    langChangeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    componentDidMount: function() {
        langStore.register(this.langChangeHandler);
    },
    render: function() {
    	var lang  = this.state.lang;
    	var btnText = (lang=='en')? 'Copy Link' : '複製連結';
    	var text  = this.props.text || '';
    	var style = {
    		display: (text==='')? 'none' : 'block'
    	};
        return (
        	<section role="clipboard" style={style} >
        		<input ref="clipboardInput" value={text} />
        		<button ref="clipboardHelper" onClick={this.clickHandler}>
        			{btnText}
        		</button>
        	</section>
        );
    }
});

module.exports = Clipboard;
