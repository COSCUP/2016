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
        return (
        	<section role="clipboard">
        		<input ref="clipboardInput" value={this.props.text} />
        		<button ref="clipboardHelper" onClick={this.clickHandler}>Copy Link</button>
        	</section>
        );
    }
});

module.exports = Clipboard;
