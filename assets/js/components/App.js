import React from 'react'
import ProductList from './ProductList'


class App extends React.Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <ProductList />
                </div>
            </section>
        );
    }
}

module.exports = App;