import React, { useState } from "react";
import ModalParcel from '../parcelConfirmation';
import {
    Card,
    Content,
    Face1,
    Face1Heading,
    ImageWrapper,
    Img,
    TextWrapper,
} from "./frontParcelCard";
import { URL_API } from '../../helper';

const FrontParcelCard = ({ item }) => {
    const [showModal, setShowModal] = useState(false)

    const handleModal = () => {
        setShowModal(true)
    }
    return (
        <div>
            <Card onClick={handleModal}>
                <Face1>
                    <Content>
                        <Face1Heading>{item.title}</Face1Heading>
                        <ImageWrapper>
                            <Img src={`${URL_API}/static/images/${item.url}`} alt="..." />
                        </ImageWrapper>
                        <TextWrapper>
                            <Face1Heading>Parcel 0{item.id}</Face1Heading>
                            <Face1Heading>IDR {item.price.toLocaleString()}</Face1Heading>
                        </TextWrapper>
                    </Content>
                </Face1>
                {/* <Face2>
                    <Face2Heading>0{item.id}</Face2Heading>
                </Face2> */}
            </Card>
            <ModalParcel
                modal={showModal}
                detailParcel={item}
                category={item.category}
                btClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default FrontParcelCard;