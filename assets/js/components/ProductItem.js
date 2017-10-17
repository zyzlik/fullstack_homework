import React from 'react'


class CountBox extends React.Component {
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
        console.log(this.props)
        let count = 0,
            that = this;

        this.props.inventory.forEach(function(obj) {
            if (obj.style !== that.props.style && that.props.style !== undefined) {
                return
            }
            if (obj.waist !== that.props.size && that.props.size !== undefined) {
                return
            }
            if (obj.length !== that.props.len && that.props.len !== undefined ) {
                return
            }
            count += obj.count
        });
        this.setState({count: count});
    }

    render() {
        return (
            <div className="has-text-info">
                {this.state.count} left
            </div>
        )
    }
}


class LengthBox extends React.Component {

    handleClick(e) {
        this.props.handleClick(parseInt(e.target.value))
    }

    render() {
        return (
            <button
                className="button is-small"
                onClick={this.handleClick.bind(this)}
                value={this.props.len}>
                {this.props.len}
            </button>
        )
    }
}


class StyleBox extends React.Component {
    handleClick(e) {
        this.props.handleClick(e.target.value)
    }

    render() {
        return (
            <button
                className="button is-small"
                onClick={this.handleClick.bind(this)}
                value={this.props.style}>
                {this.props.style}
            </button>
        )
    }
}


class SizeBox extends React.Component {

    handleClick(e) {
        this.props.handleClick(parseInt(e.target.value))
    }

    render() {
        return (
            <button
                className="button is-small"
                value={this.props.size}
                onClick={this.handleClick.bind(this)}>
                {this.props.size}
            </button>
        )
    }
}


class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: undefined,
            len: undefined,
            style: undefined
        };
    }

    handleStyleClick(val) {
        this.setState(function(prevValue, props) {
            return {style: val};
        });
    }

    handleSizeClick(val) {
        this.setState(function(prevValue, props) {
            return {size: val};
        });
    }

    handleLenClick(val) {
        this.setState(function(prevValue, props) {
            return {len: val};
        });
    }

    render() {
        let styles = new Set(),
            sizes = new Set(),
            lengths = new Set(),
            count = 0
        this.props.inventory.forEach(function(obj) {
            styles.add(obj.style)
            sizes.add(obj.waist)
            lengths.add(obj.length)
        })
        styles = Array.from(styles).map((elem, index) => (<StyleBox handleClick={this.handleStyleClick.bind(this)} style={elem} key={index} />))
        sizes = Array.from(sizes).map((elem, index) => (<SizeBox handleClick={this.handleSizeClick.bind(this)} size={elem} key={index} />))
        lengths = Array.from(lengths).map((elem, index) => (<LengthBox handleClick={this.handleLenClick.bind(this)} len={elem} key={index} />))
        return (
            <div className='box'>
                <h6 className="subtitle is-marginless">Choose style</h6>
                <div>{styles}</div>
                <h6 className="subtitle is-marginless">Choose size</h6>
                {sizes}
                <h6 className="subtitle is-marginless">Choose length</h6>
                {lengths}
                <CountBox size={this.state.size} len={this.state.len} style={this.state.style} inventory={this.props.inventory} />
            </div>
        )
    }
}


class ProductImage extends React.Component {
    render() {
        return (
            <figure className="image">
                <img src={this.props.image} />
            </figure>
        )
    }
}


class ProductItem extends React.Component {
    render() {
        let item = this.props.item
        return (
            <div className="box">
                <h1 className="title has-text-centered">{item.name}</h1>
                <ProductImage image={item.image}/>
                <h2 className="subtitle">{item.description}</h2>
                <Inventory inventory={item.inventory}/>
            </div>
        )

    }
}


module.exports = ProductItem;
