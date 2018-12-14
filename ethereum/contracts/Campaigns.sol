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
        string      userID;
        uint        reach;
        string      hashtags;
        bool        paid;
    }
    
    struct Mission {
        string      brand;
        string      brief;
        uint        target;
        bytes32[]   hashtags;
        uint        gain;
        bool        complete;
        mapping(address => User) users;
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
    }
}