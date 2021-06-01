import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import VisualPickerOption from '../../VisualPickerOption';
import VisualPickerOptionFooter from '../../VisualPickerOptionFooter';
import RenderIf from '../../RenderIf';
import Select from '../../Select';
import AddRecordsIcon from '../icons/addRecords';
import MergeRecordsIcon from '../icons/mergeRecords';
import getSchemaFieldOptions from '../helpers/getSchemaFieldOptions';
import StyledContainer from './styled/container';
import StyledVisualPicker from './styled/visualPicker';

export default function StepOne(props) {
    const { schemaFields, actionOption, onChangeAction, matchField, onChangeMatchField } = props;
    const [fieldOptions, setFieldOptions] = useState([]);
    const isMergeOption = actionOption === 'merge-records';

    useEffect(() => {
        setFieldOptions(getSchemaFieldOptions(schemaFields));
    }, [schemaFields]);

    return (
        <StyledContainer>
            <StyledVisualPicker
                label="Sélectionner une des deux options d'import"
                onChange={onChangeAction}
                value={actionOption}
            >
                <VisualPickerOption
                    name="add-records"
                    footer={<VisualPickerOptionFooter label="Ajouter" />}
                >
                    <AddRecordsIcon />
                </VisualPickerOption>
                <VisualPickerOption
                    name="merge-records"
                    footer={<VisualPickerOptionFooter label="Compléter l'existant" />}
                >
                    <MergeRecordsIcon />
                </VisualPickerOption>
            </StyledVisualPicker>
            <RenderIf isTrue={isMergeOption}>
                <Select
                    label="Champs associés"
                    placeholder="Sélectionner le champs à associé"
                    options={fieldOptions}
                    onChange={event => onChangeMatchField(event.target.value)}
                    value={matchField}
                />
            </RenderIf>
        </StyledContainer>
    );
}

StepOne.propTypes = {
    schemaFields: PropTypes.array,
    actionOption: PropTypes.string,
    onChangeAction: PropTypes.func,
    matchField: PropTypes.string,
    onChangeMatchField: PropTypes.func,
};

StepOne.defaultProps = {
    schemaFields: [],
    actionOption: '',
    onChangeAction: () => {},
    matchField: '',
    onChangeMatchField: () => {},
};
