import React, { Component } from "react"
import { connect } from "react-redux"

import { ThemeProvider } from 'mineral-ui/themes';
import { createStyledComponent } from 'mineral-ui/styles';
import { FormField, FormFieldDivider } from 'mineral-ui/Form';

import Box from 'mineral-ui/Box';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import Toggle from './Toggle';
import TextArea from 'mineral-ui/TextArea';
import IconHelp from 'mineral-ui-icons/IconHelp';
import Avatar from 'mineral-ui/Avatar';
import Tooltip from 'mineral-ui/Tooltip';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardActions, CardBlock, CardDivider, CardFooter, CardImage, CardTitle } from 'mineral-ui/Card';

class RequestSettings extends Component {
    
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
            <ThemeProvider>
                <Card>
                    <CardTitle>Request Settings</CardTitle>
                    <FormFieldDivider />
                    <CardBlock>
                        <Flex direction="column">
                            {
                                this.getRequestSettings().map( ({ label, caption, requiredText }, i) =>
                                    <FlexItem key={ i } style={{ marginBottom: '1.5em' }}>
                                        <FormField
                                            label={ label }
                                            caption={ caption }
                                            required={ !!requiredText }
                                            requiredText={ requiredText }>
                                            <Toggle/>
                                        </FormField>
                                    </FlexItem>
                                )
                            }
                        </Flex>
                    </CardBlock>
                    <FormFieldDivider />
                    <CardBlock>
                        <Flex direction="row-reverse">
                            <Button className="form-submit-buttons">Cancel</Button>
                            <Button primary>Save</Button>
                        </Flex>
                    </CardBlock>
                </Card>
            </ThemeProvider>
        )
    }


    getRequestSettings() {
        return [{
            label : "Registration Request Workflow",
            caption : "Disabling will allow users to register without an approval process.",
            requiredText : "*"
        }, {
            label : "Add Application Request Workflow",
            caption : "Disabling will allow users to create apps without an approval process.",
            requiredText : "*"
        }, {
            label : "Edit Application Request Workflow",
            caption : "Disabling will allow users to create apps without an approval process.",
            requiredText : "*"
        }];
    }


}

const mapStateToProps = ((state) => {
    return {
        columnData: state.columnData.columnData,
        rowData: state.rowData.rowData,
    };
});

// export default connect(mapStateToProps)(MasterTableLayout);
export default RequestSettings;