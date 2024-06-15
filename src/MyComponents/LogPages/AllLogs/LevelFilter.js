import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const LevelFilter = ({ levels, selectedLevel, setSelectedLevel }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={'#ffffff'} size={'md'} color={'gray'} borderRadius={'md'} fontSize={'large'} mt={1} >
        {selectedLevel === "all" ? "All levels" : `Level ${selectedLevel}`}
      </MenuButton>
      <MenuList border={'none'} zIndex={2} boxShadow={'xl'}>
        {levels.map((level) => (
          <MenuItem key={level} onClick={() => setSelectedLevel(level)}>
            {level === "all" ? "All levels" : `Level ${level}`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LevelFilter;
