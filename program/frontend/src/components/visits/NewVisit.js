import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {newVisit} from "../../actions/visit";
import Input from "react-validation/build/input";
import {getAllContacts} from "../../actions/contact";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const NewVisit = () => {
    let navigate = useNavigate();
    const [date, setDate] = useState();
    const [comment, setComment] = useState();
    const [nbArticlesSold, setNbArticlesSold] = useState();
    const [turnover, setTurnover] = useState();
    const [nextVisitDate, setNextVisitDate] = useState();
    const [forecastTurnover, setForecastTurnover] = useState();
    const [forecastNbArticles, setForecastNbArticles] = useState();
    const [contact, setContact] = useState();
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact)

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllContacts());
        }
        return () => mounted = false;
    }, []);

    const handleVisit = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(newVisit(
                date,
                comment,
                nbArticlesSold,
                turnover,
                nextVisitDate,
                forecastTurnover,
                forecastNbArticles,
                contact)).then(() => {
                    navigate("/");
                }).catch(() => {
                    setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <Form onSubmit={handleVisit} ref={form}>
                <div className="form-group">
                    <label htmlFor="date">Visit Date</label>
                    <Input
                        type="date"
                        className="form-control"
                        name="date"
                        value={date || ""}
                        onChange={(e) => setDate(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <Input
                        type="textarea"
                        className="form-control"
                        name="comment"
                        value={comment || ""}
                        onChange={(e) => setComment(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nbArticlesSold">Articles Sold Number</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="nbArticlesSold"
                        value={nbArticlesSold || ""}
                        onChange={(e) => setNbArticlesSold(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="turnover">Turnover</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="turnover"
                        value={turnover || ""}
                        onChange={(e) => setTurnover(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nextVisitDate">Next Visit Date</label>
                    <Input
                        type="date"
                        className="form-control"
                        name="nextVisitDate"
                        value={nextVisitDate || ""}
                        onChange={(e) => setNextVisitDate(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="forecastTurnover">Forecast Turnover</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="forecastTurnover"
                        value={forecastTurnover || ""}
                        onChange={(e) => setForecastTurnover(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="forecastNbArticles">Forecast Articles Sold Number</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="forecastNbArticles"
                        value={forecastNbArticles || ""}
                        onChange={(e) => setForecastNbArticles(e.target.value)}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <Select
                        name="addressId"
                        onChange={(e) => setContact(e.target.value)}
                        validations={[required]}
                        value={contact}
                    >
                        {contacts.map(contact =>
                            <option key={contact._id} value={contact._id}>
                                {contact.firstName + ' ' + contact.lastName}
                            </option>
                        )}
                    </Select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Create Visit</span>
                    </button>
                </div>


                <CheckButton style={{ display: "none" }} ref={checkBtn} />

            </Form>
        </div>
    )
}

export default NewVisit;