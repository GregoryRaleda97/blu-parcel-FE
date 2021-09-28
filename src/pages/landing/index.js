import React from 'react';
import CarouselComp from '../../components/carousel';
import SwiperComp from '../../components/swiper/index'
import Home from '../home/home';
import Row1 from '../../components/row/row1'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <CarouselComp />
                <Home />
                <SwiperComp />
                <Row1 />
            </div>
        );
    }
}

export default LandingPage;