import {useEffect} from "react";
import {getAllContacts} from "../../actions/contact";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllAddresses} from "../../actions/address";

const ListContact = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { contacts } = useSelector((state) => state.contact);
    const { addresses } = useSelector((state) => state.address);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllContacts());
            dispatch(getAllAddresses());
        }
        return () => mounted = false;
    }, []);

    const newContact = (e) => {
        e.preventDefault();
        navigate("/contact/new");
    }

    const updateContactButton = (id) => {
        navigate("/contact/"+id);
    }

    const displayAddressId = (addressId) => {
        let address = addresses.filter((address) => address._id === addressId);
        return address[0].address + " " + address[0].postalCode + " " + address[0].city;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-items-end">
                    <button className="btn btn-primary" onClick={newContact}>
                        New Contact
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    Full Name
                </div>
                <div className="col-4">
                    Email
                </div>
                <div className="col-2">
                    Phone Number
                </div>
                <div className="col-3">
                    Address
                </div>
                <div className="col-1">
                    Actions
                </div>
            </div>
            {contacts.map(contact =>
                    <div className="row" key={contact._id}>
                        <div className="col-2">
                            {contact.firstName + " " + contact.lastName}
                        </div>
                        <div className="col-4">
                            {contact.email}
                        </div>
                        <div className="col-2">
                            {contact.phoneNumber}
                        </div>
                        <div className="col-3">
                            {
                                displayAddressId(contact.address)
                            }
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary" onClick={() => updateContactButton(contact._id)}>
                                Update
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ListContact;