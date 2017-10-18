import React from 'react'


export class CountBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        this.countLeft();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.countLeft();
        }
    }

    countLeft() {
        let count = 0,
            that = this;
        this.props.inventory.forEach(function(obj) {
            if (obj.style !== that.props.style && that.props.style !== '') {
                return
            }
            if (obj.waist !== that.props.size && that.props.size !== '') {
                return
            }
            if (obj.length !== that.props.len && that.props.len !== '' ) {
                return
            }
            count += obj.count
        });
        this.setState({count: count});
    }

    render() {
        let few = this.state.count < 10
        let msg = few ? `Only ${this.state.count} left!` : `${this.state.count} in stock`
        let className = few ? "has-text-danger" : "has-text-info"

        return (
            <div className={className}>
                {msg}
            </div>
        )
    }
}


export class LengthBox extends React.Component {
    handleChange(e) {
        this.props.handleChange(parseInt(e.target.value))
    }

    render() {
        let text = this.props.len ? this.props.len : 'all'
        return (
            <label className="radio">
                <input type="radio"
                 value={this.props.len}
                 onChange={this.handleChange.bind(this)}
                 name={this.props.name}
                 defaultChecked={this.props.len === ''} />
                {text}
            </label>
        )
    }
}


export class StyleBox extends React.Component {
    render() {
        return (
            <option value={this.props.style}>{this.props.style}</option>
        )
    }
}


export class SizeBox extends React.Component {

    handleChange(e) {
        this.props.handleChange(parseInt(e.target.value))
    }

    render() {
        let text = this.props.size ? this.props.size : 'all'
        return (
             <label className="radio">
                <input type="radio"
                 value={this.props.size}
                 onChange={this.handleChange.bind(this)}
                 name={this.props.name}
                 defaultChecked={this.props.size === ''} />
                {text}
            </label>
        )
    }
}
