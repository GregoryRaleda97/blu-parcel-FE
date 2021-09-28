import React from 'react';
import { Container, Input, Label, Button, CardImg} from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import "../product/productPage.css"
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import { URL_API } from '../../helper';
import { toast } from 'react-toastify';
import "../parcel/parcelPage.css"
import ModalParcel from '../../components/parcelConfirmation';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import Image from '../../asset/img/snackimage.jpg';
import {Ring} from 'react-awesome-spinners'

toast.configure()

class ParcelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 4,
            currentPage: 0,
            filterCtg: [],
            checkedCtg: {
                1: false,
                2: false,
                3: false
            },
            filter: [],
            filterName: '',
            dataFilterName: [],
            modal: false,
            selectedIndex: null,
            parcel: [],
            detailParcel: {},
            category: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.dataParcel()
        this.handleSort()
    }

    dataParcel = () => {
        this.setState({ loading: true })
        axios.get(URL_API + `/parcel/get-parcel`)
            .then(res => {
                this.setState({ parcel: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage), loading: false })
            }).catch(err => console.log(err))
    }

    getData = () => {
        console.log(this.state.parcel)
        return this.state.parcel.slice(this.state.offset, this.state.offset + this.state.perPage).map((item, index) => {
            return <div className="col-md-3 mt-5">
                <div>
                    <Card className="card-row">
                        {
                            // item.url.includes('.jpg') || item.url.includes('.png') || item.url.includes('.jpeg') ?
                            <CardImg style={{ boxShadow: '5px 5px 15px #9c9c9c', borderRadius: "20px", backgroundColor:'#f5f5f5' }} src={URL_API + '/static/images/' + item.url} alt="img" />
                            // <CardImg style={{ height: '170px' }} src={'https://drive.google.com/uc?export=view&id=' + item.url} alt="img" />
                        }
                        <CardContent>
                            <Typography gutterBottom component="div">
                                Parcel {item.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                                {item.title}
                            </Typography>
                            <Typography gutterBottom component="div">
                                Rp. {item.price.toLocaleString()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => this.setState({ detailParcel: item, modal: !this.state.modal, category: item.category.join("&") })} className="button-cart">
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        })
    }

    resetCheckbox = () => {
        window.location.reload()
    }

    checkbox = (e) => {
        var { name, checked } = e.target
        this.setState((e) => {
            var selectedCtg = e.checkedCtg
            return selectedCtg[name] = checked
        })
    }

    handleFilter = () => {
        var display = Object.keys(this.state.checkedCtg).filter((x) => this.state.checkedCtg[x])
        var filter = display.join("&")
        console.log("fff", display)
        axios.get(URL_API + `/parcel/filter-parcel?${filter}`)
            .then(res => {
                console.log("filter", res.data)
                console.log("nama", this.state.filterName)
                this.setState({ parcel: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) })
            }).catch(err => console.log(err))
    }

    handleSort = () => {
        if (this.sort.value === "nama-asc") {
            this.state.parcel.sort((a, b) => {
                return a.id - b.id
            })
        } else if (this.sort.value === "nama-desc") {
            this.state.parcel.sort((a, b) => {
                return b.id - a.id
            })
        } else if (this.sort.value === "harga-asc") {
            this.state.parcel.sort((a, b) => {
                return a.price - b.price
            })
        } else if (this.sort.value === "harga-desc") {
            this.state.parcel.sort((a, b) => {
                return b.price - a.price
            })
        } else if (this.sort.value === "id-asc") {
            return this.state.parcel
        }
        this.setState(this.state.parcel)
        this.getData()
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getData()
        });
    };


    render() {
        return (
            <Container style={{ marginTop: '120px' }}>
                <div className="row" >
                    <ModalParcel modal={this.state.modal} detailParcel={this.state.detailParcel} category={this.state.category}
                        btClose={() => this.setState({ modal: !this.state.modal })} />
                    <div className="col-md-3 mt-3">
                        <div>
                            <h2 className="h2-sort">SORT</h2>
                            <Input style={{ width: '200px' }} type="select" onClick={this.handleSort} innerRef={elemen => this.sort = elemen} >
                                <option selected disabled>-</option>
                                <option value="nama-asc" >A - Z</option>
                                <option value="nama-desc">Z - A</option>
                                <option value="harga-asc">Harga Terendah - Tertinggi</option>
                                <option value="harga-desc">Harga Tertinggi - Terendah</option>
                            </Input>
                            <h2 className="mt-5 h2-sort">Kategori</h2>
                            <div className="div-checkbox" >
                                <Checkbox className="chkbox" color="primary" name="idcategori=1" onChange={this.checkbox} />
                                <Label className="label-chk">Foods</Label>
                            </div>
                            <div className="div-checkbox">
                                <Checkbox className="chkbox" color="primary" name="idcategori=2" onChange={this.checkbox} />
                                <Label className="label-chk">Drinks</Label>
                            </div>
                            <div style={{ marginTop: '15px', display: 'flex' }}>
                                <Button onClick={() => this.resetCheckbox()} color="secondary" className="button--1">
                                    Reset
                                </Button>
                                <Button onClick={this.handleFilter} className="button---1">
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="carouselParcel-row">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="parcel-row-img"
                                        src={Image}
                                        alt=""
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="h1-text">
                            <h1>Pilih Parcel Kesukaanmu</h1>
                        </div>
                        <div className="row">
                            {
                                this.state.loading === true &&
                                <Ring className='ring'/>
                            }
                            {this.getData()}
                        </div>
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={4}
                            pageRangeDisplayed={15}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = ({ parcelReducers, authReducer }) => {
    return {
        ...authReducer,
        parcel: parcelReducers.parcel_list,
    }
}

export default connect(mapStateToProps, {})(ParcelPage);