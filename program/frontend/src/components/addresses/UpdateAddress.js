import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAddress, updateAddress} from "../../actions/address";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const UpdateAddress = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [postalCode, setPostalCode] = useState();
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);

    useEffect(() => {
        dispatch(getAddress(id)).then(() => {
            let addressToUpdate = addresses.find(obj => {
                return obj._id === id;
            })
            if (addressToUpdate) {
                setAddress(addressToUpdate.address);
                setCity(addressToUpdate.city);
                setPostalCode(addressToUpdate.postalCode);
            }
        });
    }, [id]);

    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const onChangePostalCode = (e) => {
        setPostalCode(e.target.value);
    }
    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const handleAddress = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(updateAddress(id, address, postalCode, city))
                .then(() => {
                    navigate("/");
                    // window.location.reload();
                })
                .catch(() => {
                    setLoading(false)
                });
        } else {
            setLoading(false);
        }
    }
    return (
        <div className="container">
            <Form onSubmit={handleAddress} ref={form}>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address || ""}
                        onChange={onChangeAddress}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">postalCode</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="postalCode"
                        value={postalCode || ""}
                        onChange={onChangePostalCode}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="city"
                        value={city || ""}
                        onChange={onChangeCity}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Update Address</span>
                    </button>
                </div>


                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
}

export default UpdateAddress;