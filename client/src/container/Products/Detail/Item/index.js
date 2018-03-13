import React, { Component } from 'react';
import * as CartActionType from './constants';
import { connect } from 'react-redux';

class ItemDetail extends Component {

    addToCart(event, product) {
        event.preventDefault();
        this.props.dispatch({
            type: CartActionType.ADD_TO_CART,
            data: 
            {   product,
                quantity: 1
            }
        });
        
    }

    renderItem() {
        let {data} = this.props;
        return(<div className="detail-page" key={data._id}>
        <div className="row product-detail">
            <div className="col-xs-12 col-sm-5 col-md-3 product-images">
              <div className="thumbnails">
                <div className="product-image"><div className="thumbnail">
                    <img src={data.imgUrl} alt={this.name}/></div></div>
              </div>
              </div>
          <div className="col-xs-12 col-sm-7 col-md-9 product-details">
          <div className="column-inner">
          <h1 className="product-name">{data.name}</h1>
          <p className="voting">Đánh giá sản phẩm</p>
          <div className="rating">
              <input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Xuất sắc - 5 sao"></label>
              <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Rất tốt - 4.5 stars"></label>
              <input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Khá tốt - 4 stars"></label>
              <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Trung bình khá - 3.5 stars"></label>
              <input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Trung bình - 3 stars"></label>
              <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Chưa tốt - 2.5 stars"></label>
              <input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Tệ - 2 stars"></label>
              <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Quá tệ - 1.5 stars"></label>
              <input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Không quan tâm - 1 star"></label>
              <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Mất thời gian - 0.5 stars"></label>
          </div>
          <p className="price_line">Giá: <span className="price">{data.price}</span> VNĐ</p>
          <button className="button secondary" onClick={(e) => this.addToCart(e, data)}>Đặt mua</button>
          </div>
          </div>          
        </div>
        <p className="product-desc">Chi tiết sản phẩm</p>
        <p>{data.description}</p>
</div>)
    }

    render() {
        console.log(this.props);
        return(<div>
                {this.renderItem()}
            </div>
        );
    }
}


export default connect()(ItemDetail);