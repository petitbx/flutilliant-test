import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getAllContacts} from "../../actions/contact";
import {getVisits} from "../../actions/visit";

const ListVisit = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { contacts } = useSelector((state) => state.contact);
    const { visits } = useSelector((state) => state.visit);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllContacts());
            dispatch(getVisits());
        }
        return () => mounted = false;
    }, []);

    const newVisit = (e) => {
        e.preventDefault();
        navigate("/visit/new");
    }

    const updateVisitButton = (id) => {
        navigate("/visit/"+id);
    }

    const showVisitButton = (id) => {
        navigate("/visit/"+id+"/show")
    }

    const displayContact = (contactId) => {
        let contact = contacts.filter((contact) => contact._id === contactId);
        return contact[0].firstName + " " + contact[0].lastName
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 align-items-end">
                    <button className="btn btn-primary" onClick={newVisit}>
                        New Visit
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    Contact
                </div>
                <div className="col-3">
                    Date
                </div>
                <div className="col-2">
                    Turnover
                </div>
                <div className="col-2">
                    Number Sold Articles
                </div>
                <div className="col-1">
                    Actions
                </div>
            </div>
            {
                visits.map(visit =>
                    <div className="row" key={visit._id}>
                        <div className="col-4">
                            {
                                displayContact(visit.contact)
                            }
                        </div>
                        <div className="col-3">
                            {visit.date}
                        </div>
                        <div className="col-2">
                            {visit.turnover}
                        </div>
                        <div className="col-2">
                            {visit.nbArticlesSold}
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary" onClick={() => updateVisitButton(visit._id)}>
                                Update
                            </button>
                            <button className="btn btn-primary" onClick={() => showVisitButton(visit._id)}>
                                Show Details
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListVisit;