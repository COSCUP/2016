// Include library
var React    = require('react');
var ReactDOM = require('react-dom');

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
    render: function() {
    	var text  = this.props.text || '';
    	var style = {
    		display: (text==='')? 'none' : 'block'
    	};
        return (
        	<section role="clipboard" style={style} >
        		<input ref="clipboardInput" value={text} />
        		<button ref="clipboardHelper" onClick={this.clickHandler}>Copy Link</button>
        	</section>
        );
    }
});

module.exports = Clipboard;
