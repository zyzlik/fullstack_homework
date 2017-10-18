import React from 'react'
import { CountBox, LengthBox, StyleBox, SizeBox } from './Box'


export class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: '',
            len: '',
            style: ''
        };
        this.handleLenChange.bind(this)
    }

    handleStyleChange(e) {
        let val = e.target.value
        let newStyle = this.state.style === val ? '' : val;
        this.setState(function(prevValue, props) {
            return {style: newStyle};
        });
    }

    handleSizeChange(val) {
        val = isNaN(val) ? '' : val
        let newSize = this.state.size === val ? '' : val;
        this.setState(function(prevValue, props) {
            return {size: newSize};
        });
    }

    handleLenChange(val) {
        val = isNaN(val) ? '' : val
        let newLen = this.state.len === val ? '' : val
        this.setState(function(prevValue, props) {
            return {len: newLen};
        });
    }

    render() {
        let styles = new Set(),
            sizes = new Set(),
            lengths = new Set(),
            count = 0
        sizes.add('')
        lengths.add('')
        this.props.inventory.forEach(function(obj) {
            styles.add(obj.style)
            sizes.add(obj.waist)
            lengths.add(obj.length)
        })
        let sizeName = `size_${this.props.productId}`
        let lenName = `length_${this.props.productId}`
        styles = Array.from(styles).map((elem, index) => (<StyleBox style={elem} key={index} />))
        sizes = Array.from(sizes).map((elem, index) => (<SizeBox handleChange={this.handleSizeChange.bind(this)} size={elem} key={index} name={sizeName}/>))
        lengths = Array.from(lengths).map((elem, index) => (<LengthBox handleChange={this.handleLenChange.bind(this)} len={elem} key={index} name={lenName}/>))
        return (
            <div className='box'>
                <div className="field">
                    <label className="label">Choose style</label>
                    <div className="control">
                        <div className="select">
                            <select onChange={this.handleStyleChange.bind(this)}>
                                <option value=''>all styles</option>
                                {styles}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Choose size</label>
                        {sizes}
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Choose length</label>
                        {lengths}
                    </div>
                </div>
                <CountBox size={this.state.size} len={this.state.len} style={this.state.style} inventory={this.props.inventory} />
            </div>
        )
    }
}