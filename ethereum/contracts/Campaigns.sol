pragma solidity ^0.4.24;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string brand, string brief, uint target, bytes32[] hashtags, uint gain) public {
        address newCampaign = new Campaign(brand, brief, target, hashtags, gain, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct User {
        address     userAddress;
        uint        reach;
        bool        paid;
    }
    
    struct Mission {
        string      brand;
        string      brief;
        uint        target;
        bytes32[]   hashtags;
        uint        gain;
        bool        complete;
        uint        usersCount;
        mapping(uint => User) users;
    }
    
    mapping(address => Mission) missions;
    address public manager;

    modifier restricted() {
        require(
            msg.sender == manager,
            "Restricted to manager"
        );
        _;
    }

    constructor (string _brand, string _brief, uint _target, bytes32[] _hashtags, uint _gain, address _creator) public {
        manager = _creator;
        Mission storage mission = missions[_creator];
        mission.brand = _brand;
        mission.brief = _brief;
        mission.target = _target;
        mission.hashtags = _hashtags;
        mission.gain = _gain;
        mission.complete = false;
    }
    
    function getMission(address _creator) public view returns (string brand, string brief, uint target, bytes32[] hashtags, uint gain, bool complete) {
        Mission memory p = missions[_creator];
        return (p.brand, p.brief, p.target, p.hashtags, p.gain, p.complete);
    }
    
    function apply() public {
        Mission storage mission = missions[manager];
        mission.users[mission.usersCount++] = User({userAddress: msg.sender, reach: 0, paid: false});
    }

    function getUser(uint index) public view returns (address userAddress, uint reach, bool paid) {
        Mission storage m = missions[manager];
        return (m.users[index].userAddress, m.users[index].reach, m.users[index].paid);
    }

    function getUsersCount() public view returns (uint usersCount) {
        Mission storage m = missions[manager];
        return (m.usersCount);
    }
}