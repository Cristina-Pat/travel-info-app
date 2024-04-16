import PropTypes from "prop-types";

function TellingYou({about}) {
    return (
        <>
            <h1 className="text-center">Telling you about...</h1>
            <h1 className="text-center mb-4">{about}</h1>
        </>
    );
}

TellingYou.propTypes = {
    about : PropTypes.string.isRequired,
}

export default TellingYou;
