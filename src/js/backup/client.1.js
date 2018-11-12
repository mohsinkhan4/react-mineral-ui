import React from "react";
import { render } from "react-dom";

import { ThemeProvider } from 'mineral-ui/themes';
import { createStyledComponent } from 'mineral-ui/styles';
import { FormField, FormFieldDivider } from 'mineral-ui/Form';

import Box from 'mineral-ui/Box';
import Button from 'mineral-ui/Button';
import TextInput from 'mineral-ui/TextInput';
import TextArea from 'mineral-ui/TextArea';
import IconHelp from 'mineral-ui-icons/IconHelp';
import Avatar from 'mineral-ui/Avatar';
import Tooltip from 'mineral-ui/Tooltip';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardActions, CardBlock, CardDivider, CardFooter, CardImage, CardTitle } from 'mineral-ui/Card';

function App() {

    const basicSettings = [{
        label : "Admin Email",
        caption : "Enter an email where users can contact you. Changes applied to Admin and Developer websites.",
        requiredText : "*"
    }, {
        label : "Google Analytics",
        caption : "Enter your Google Analytics ID e.g. UA-XXXXX-XX"
    }, {
        label : [
            <span key="1">API Explorer Default Proxy</span>,
            <Tooltip key="2" placement="right" content="Enter a proxy you would like to use as the default for testing APIs with the API Explorer.">
                <Button minimal iconStart={ <IconHelp color="#09aeef"/> }/>
            </Tooltip> ],
        caption : "Maximum length is 255 characters."
    }];

	return (
		<ThemeProvider>
            <Card>
                <CardTitle>Basic Settings</CardTitle>
                <FormFieldDivider />
                <CardBlock>
                    <Flex direction="column">
                        { basicSettings.map( ({ label, caption, requiredText }, i) =>
                            <FlexItem key={ i } style={{ marginBottom: '1.5em' }}>
                                <FormField
                                    label={ label }
                                    caption={ caption }
                                    required={ !!requiredText }
                                    requiredText={ requiredText }>
                                    <TextInput/>
                                </FormField>
                            </FlexItem>
                        )}
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

render(<App />, document.getElementById('app'));