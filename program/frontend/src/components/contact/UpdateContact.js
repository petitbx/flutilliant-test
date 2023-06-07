import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllAddresses} from "../../actions/address";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import {getContact, updateContact} from "../../actions/contact";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const UpdateContact = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [lastname, setLastName] = useState();
    const [firstname, setFirstname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [addressId, setAddressId] = useState();
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);
    const { contacts } = useSelector((state) => state.contact);

    useEffect(() => {
        dispatch(getAllAddresses()).then(() => {
            dispatch(getContact(id)).then(() => {
                let contactToUpdate = contacts.find(obj => {
                    return obj._id === id;
                })
                if (contactToUpdate) {
                    setLastName(contactToUpdate.lastName);
                    setFirstname(contactToUpdate.firstName);
                    setEmail(contactToUpdate.email);
                    setAddressId(contactToUpdate.address);
                    setPhoneNumber(contactToUpdate.phoneNumber);
                }
            });
        })
    }, [id]);

    const onChangeLastname = (e) => {
        setLastName(e.target.value);
    }

    const onChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeAddress = (e) => {
        setAddressId(e.target.value);
    }

    const handleContact = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(updateContact(id, lastname, firstname, phoneNumber, email, addressId))
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
            <Form onSubmit={handleContact} ref={form}>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={lastname || ""}
                        onChange={onChangeLastname}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={firstname || ""}
                        onChange={onChangeFirstname}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={phoneNumber || ""}
                        onChange={onChangePhoneNumber}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email || ""}
                        onChange={onChangeEmail}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addressId">Address</label>
                    <Select
                        name="addressId"
                        onChange={onChangeAddress}
                        validations={[required]}
                        value={addressId}
                    >
                        {addresses.map(address =>
                            <option key={address._id} value={address._id}>
                                {address.address + ' ' + address.postalCode + " " + address.city}
                            </option>
                        )}
                    </Select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Update Contact</span>
                    </button>
                </div>


                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
}

export default UpdateContact;