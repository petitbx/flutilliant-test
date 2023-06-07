import {useEffect} from "react";
import {getAllAddresses} from "../../actions/address";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ListContact = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { addresses } = useSelector((state) => state.address);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllAddresses())
        }
        return () => mounted = false;
    }, []);

    const newAddress = (e) => {
        e.preventDefault();
        navigate("/address/new");
    }

    const updateAddressButton = (id) => {
        navigate("/address/"+id);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-items-end">
                    <button className="btn btn-primary" onClick={newAddress}>
                        New Address
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    Address
                </div>
                <div className="col-3">
                    Postal Code
                </div>
                <div className="col-4">
                    City
                </div>
                <div className="col-1">
                    Actions
                </div>
            </div>
            {addresses.map(address =>
                    <div className="row" key={address._id}>
                        <div className="col-4">
                            {address.address}
                        </div>
                        <div className="col-3">
                            {address.postalCode}
                        </div>
                        <div className="col-4">
                            {address.city}
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary" onClick={() => updateAddressButton(address._id)}>
                                Update
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ListContact;