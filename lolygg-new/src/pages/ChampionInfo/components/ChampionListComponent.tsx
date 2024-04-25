import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChampionListComponent.module.css";
import { Button, Chip, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

type Props = {
    championObjectArray : any[]
}

type TagFilterProps = { id : string, enTag : string, koTag : string }[]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const tagFilterNames : TagFilterProps  = [
    { id : '1', enTag : 'Tank', koTag : '탱커' },
    { id : '2', enTag : 'Mage', koTag : '마법' },
    { id : '3', enTag : 'Fighter', koTag : '전사' },
    { id : '4', enTag : 'Assassin', koTag : '암살자' },
    { id : '5', enTag : 'Support', koTag : '지원' },
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

// 챔피언 리스트 컴포넌트
const ChampionListComponent = ({
    championObjectArray,
} : Props) => {
    const navigate = useNavigate();

    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <div className={styles['championPage-SearchContainer']}>
                <div>
                    <Input type="text" placeholder="챔피언 검색" />
                    <Button>검색</Button>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">타입</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                        {tagFilterNames.map((name) => (
                            <MenuItem
                                key={name.id}
                                value={name.enTag}
                                style={getStyles(name.enTag, personName, theme)}
                            >
                            {name.koTag}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {championObjectArray.map((championName, index) => {
                return (
                    <div 
                        className={styles['championList-champContainer']} 
                        key={index}
                        onClick={() => {navigate(`/championInfo/${championObjectArray[index].key}`)}}
                    >
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${championObjectArray[index].id}.png`} 
                            className={styles['championList-img']}
                            // onError={() => onErrorImg()}
                            alt={championObjectArray[index].id}
                        />
                        <div>{championObjectArray[index].name}</div>
                    </div>
                )})
            }
        </div>
    )
}

export default ChampionListComponent;
