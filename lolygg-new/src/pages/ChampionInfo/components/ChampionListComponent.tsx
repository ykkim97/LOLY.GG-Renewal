import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChampionListComponent.module.css";
import { Chip, FormControl, Input, InputBase, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

// 챔피언데이터타입
type Props = {
    championObjectArray : any[]
}

// 태그필터타입
type TagFilterProps = { 
    id : string, 
    enTag : string, 
    koTag : string,
    color: string 
}[]

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
    { id: '1', enTag: 'Tank', koTag: '탱커', color: '#f44336' },
    { id: '2', enTag: 'Mage', koTag: '마법', color: '#2196f3' },
    { id: '3', enTag: 'Fighter', koTag: '전사', color: '#ff9800' },
    { id: '4', enTag: 'Assassin', koTag: '암살자', color: '#9c27b0' },
    { id: '5', enTag: 'Support', koTag: '지원', color: '#4caf50' },
];

function getStyles(name: string, tagName: readonly string[], theme: Theme) {
    return {
        fontWeight:
        tagName.indexOf(name) === -1
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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(typeof value === 'string' ? value.split(',') : value);
    };

    // 검색 조건 필터링
    const filteredChampions = championObjectArray.filter(champion => {
        const matchesTag = selectedTags.length === 0 || champion.tags.some((tag: string) => selectedTags.includes(tag));
        const matchesSearch = searchTerm.trim() === '' || champion.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return (
        <div>
            <div className={styles['championPage-SearchContainer']}>
                <div>
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            inputProps={{ 'aria-label': 'search' }}
                            className={styles['championPage-SearchForm']}
                            placeholder="챔피언 검색" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Search>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 350 }}>
                        <InputLabel id="demo-multiple-chip-label">타입</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            className={styles['championPage-SelectTagBox']}
                            value={selectedTags}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const tag = tagFilterNames.find(tag => tag.enTag === value);
                                        return (
                                            <Chip
                                                key={value}
                                                label={tag?.koTag}
                                                style={{ backgroundColor: tag?.color, color: 'white' }}
                                            />
                                        );
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                        {tagFilterNames.map((name) => (
                            <MenuItem
                                key={name.id}
                                value={name.enTag}
                                style={getStyles(name.enTag, selectedTags, theme)}
                            >
                                {name.koTag}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {filteredChampions.length > 0 ? (
                filteredChampions.map((champion) => (
                    <div
                        className={styles['championList-champContainer']}
                        key={champion.id}
                        onClick={() => { navigate(`/championInfo/${champion.key}`) }}
                    >
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.id}.png`}
                            className={styles['championList-img']}
                            alt={champion.id}
                        />
                        <div>{champion.name}</div>
                    </div>
                ))
            ) : (
                <div className={styles['noResults']}>
                    <h3>검색 결과가 없습니다.</h3>
                </div>
            )}
        </div>
    )
}

export default ChampionListComponent;
