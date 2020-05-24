const React = require('react');
const ReactDOM = require('react-dom');
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { RiFileCopyLine } from "react-icons/ri";
import {
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

  import {
    TwitterIcon,
    WhatsappIcon
  } from "react-share";

class App extends React.Component {

	constructor(props) {
        super(props);
        this.state = {response: {}, request: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        try {
            const authResult = new URLSearchParams(window.location.search);
            const queryParam = authResult.get('query')
            if (queryParam) {
                this.state.request = JSON.parse(atob(queryParam));
            }
        } catch (err) {
            this.state.request = {}
        }
        this.handleSubmit(this.state.request);
    }

    handleSubmit = (request) => {
        this.setState({ response: {"status": "Executing Query!"} })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(request)
        };
        fetch('/search', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ response: data }));
    }

	render() { 
		return (
            <div>
            <label className="label">Finding Meow 😺 - the cutest cat from each town using Elasticsearch</label>
            <h3 className="website_url">Problem Statement & Solution: <a href="https://medium.com/@sharmasha2nk/finding-meow-the-cutest-cat-from-each-town-using-elastic-search-29a9417bc24d" target="_blank">#cutest-cat-per-town</a></h3>
            <div className="row">
                <div className="column">
                    <h5 className="title">Query</h5>
                    <ESRequest requestBody={this.state.request} handleClick={this.handleSubmit}/>
                </div>
                <div className="column">
                    <h5 className="title">Result</h5>
                    <ESResponse response={this.state.response}/>
                </div>
            </div>
            </div>
        )
	}
}

class ESRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: props.requestBody,
            copied: false,
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var request = event.jsObject;
        try {
            var url = window.location.origin;
            url = url + "/?query=" + btoa(JSON.stringify(request));
            this.setState({request: request, url: url})
        } catch (err) {
            this.setState({request: request, url:""})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        nextState.request = nextProps.requestBody;
        try {
            var url = window.location.origin;
            url = url + "/?query=" + btoa(JSON.stringify(nextState.request));
            nextState.url= url;
        } catch (err) {
        }
        return true;
    }

    componentDidMount() {
        try {
            var url = window.location.origin;
            url = url + "/?query=" + btoa(JSON.stringify(this.state.request));
            this.setState({url: url});
        } catch (err) {
        }
    }

    render() {
        return (
            <form onSubmit={(event)=> {event.preventDefault(); this.props.handleClick(this.state.request);}}>
                <JSONInput
                    id = 'request_view'
                    onChange = {
                        this.handleChange
                    }
                    placeholder={this.state.request}
                    theme = "dark_vscode_tribute"
                    locale = {
                        locale
                    }
                    waitAfterKeyPress = {5000}
                    width = '100%'
                    height = '75vh' />
                <input type="submit" className="button" value="Meow >>" />
                <span title="Share your solution & challenge others." className="shareMenu">
                    {this.state.copied ? <span className="hideMe">Copied.</span> : null}
                <CopyToClipboard text={this.state.url}
                    onCopy={() => { this.setState({copied: true}); var e=this; setTimeout(function(){ e.setState({copied: false}); }, 2000);}}>
                        <RiFileCopyLine size={30}/>
                </CopyToClipboard>
                <TwitterShareButton title="I challenge you to find meow! Here is my solution." hashtags={["cutest_cat_per_town", "findingmeow", "elasticsearch", "challenge"]} url={this.state.url}>
                    <TwitterIcon size={32} round={false} />
                </TwitterShareButton>
                <WhatsappShareButton title="I challenge you to find meow! #cutest-cat-per-town Here is my solution." url={this.state.url}>
                    <WhatsappIcon size={32} round={false} />
                </WhatsappShareButton>
                </span>
            </form>
        )
    }
}

class ESResponse extends React.Component {
    render() {
        return ( 
            <JSONInput id = 'response_view'
            placeholder = {
                this.props.response
            }
            theme = "dark_vscode_tribute"
            locale = {
                locale
            }
            viewOnly = {
                true
            }
            confirmGood = {
                false
            }
            width = '100%'
            height = '75vh' />
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

