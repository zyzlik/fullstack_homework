import React from 'react'
import { Inventory } from './Inventory'


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
                <h4 className="subtitle is-size-6">{item.description}</h4>
                <Inventory inventory={item.inventory} productId={item.id}/>
            </div>
        )

    }
}


module.exports = ProductItem;
