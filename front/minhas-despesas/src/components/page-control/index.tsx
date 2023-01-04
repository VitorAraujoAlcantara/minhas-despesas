import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { PageControlTabConfig } from "../../types/page-control-tab-config";
import Box, { BoxBottom } from "../box";
import Button from "../buttons/button";

const DivRoot = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
`

const DivTabContainer = styled(BoxBottom)`
    display: flex;    
    overflow: auto;
`

const DivTabs = styled.div`
    display: flex;
    flex: 1;
`

const Tab = styled(Button)`
    
`

const TabActive = styled(Tab)`
    /* background-color:#ccc; */
    background-color: ${props => props.theme.palette.secondary.main};
    opacity: 0.7;
    color: ${props => props.theme.palette.secondary.contrastText};
    cursor: not-allowed;
`

const NextPriorDiv = styled.div`

`

const BodyDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
`

interface PageControlProps {
    tabs: Array<PageControlTabConfig>;
    showPrior?: boolean;
    showNext?: boolean;
    children?: any;
    onTabClick?: (key: string) => void;
    onTabNextClick?: () => void;
    onTabPriorClick?: () => void;
}

const PageControl = (props: PageControlProps) => {
    const [urlRedirect, setUrlRedirect] = useState<string>('');

    if ( urlRedirect){
        return <Navigate to={urlRedirect} />
    }

    return (
        <DivRoot>
            <DivTabContainer>

                {props.showPrior === true &&
                    <NextPriorDiv>
                        <Tab
                            onClick={e => {
                                if (!props.onTabPriorClick) {
                                    return;
                                }
                                props.onTabPriorClick()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Tab>
                    </NextPriorDiv>
                }

                <DivTabs>
                    {props.tabs.map((tab) => {
                        if (tab.active) {
                            return (
                                <TabActive
                                    key={tab.key}
                                    onClick={e => {                                        

                                        if (!props.onTabClick) {
                                            return;
                                        }
                                        props.onTabClick(tab.key)
                                    }}
                                >
                                    {tab.caption}
                                </TabActive>
                            )
                        }
                        return (
                            <Tab
                                key={tab.key}
                                onClick={e => {
                                    if (!props.onTabClick) {
                                        return;
                                    }
                                    props.onTabClick(tab.key)
                                }}
                            >
                                {tab.caption}
                            </Tab>
                        )
                    })}
                </DivTabs>

                {props.showNext === true &&
                    <NextPriorDiv>
                        <Tab
                            onClick={e => {
                                if (!props.onTabNextClick) {
                                    return;
                                }
                                props.onTabNextClick()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Tab>
                    </NextPriorDiv>
                }
            </DivTabContainer>
            <BodyDiv>
                {props.children}
            </BodyDiv>

        </DivRoot>
    )
}

export default PageControl