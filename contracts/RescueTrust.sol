// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RescueTrust {
    address public owner;
    
    // Struct representing a rescue feedback log on-chain
    struct RescueRecord {
        string requestId;
        address volunteer;
        string volunteerName;
        string category;
        uint8 rating;
        uint256 hoursWorked;
        string feedback;
        uint256 timestamp;
    }
    
    // Struct representing a Soulbound Token (SBT) metadata
    struct SoulboundToken {
        uint256 tokenId;
        address volunteer;
        string volunteerName;
        string category;
        uint8 rating;
        uint256 hoursWorked;
        string feedback;
        uint256 timestamp;
        string requestId;
    }
    
    uint256 public nextTokenId = 1;
    
    // Maps tokenId to SoulboundToken metadata
    mapping(uint256 => SoulboundToken) public soulboundTokens;
    
    // Maps volunteer address to list of their token IDs
    mapping(address => uint256[]) public volunteerTokens;
    
    // Maps requestId to RescueRecord (to prevent duplicate entries)
    mapping(string => RescueRecord) public rescueRecords;
    string[] public allRequestIds;
    
    // ERC721 metadata fields (minimal custom implementation for SBT)
    string public name = "Volunteer Rescue SBT";
    string public symbol = "VRES-SBT";
    
    // Events
    event RescueResolved(string indexed requestId, address indexed volunteer, string volunteerName, uint256 hoursWorked, uint256 timestamp);
    event SBTMinted(uint256 indexed tokenId, address indexed volunteer, string volunteerName, uint8 rating, uint256 hoursWorked, string requestId, uint256 timestamp);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner (NGO admin) can execute this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Record a resolved rescue on-chain (prior to victim feedback)
    function recordRescueResolution(
        string calldata _requestId,
        address _volunteer,
        string calldata _volunteerName,
        string calldata _category,
        uint256 _hoursWorked
    ) external onlyOwner {
        require(rescueRecords[_requestId].timestamp == 0, "Rescue already recorded on-chain");
        
        rescueRecords[_requestId] = RescueRecord({
            requestId: _requestId,
            volunteer: _volunteer,
            volunteerName: _volunteerName,
            category: _category,
            rating: 0, // Not rated yet
            hoursWorked: _hoursWorked,
            feedback: "", // No feedback yet
            timestamp: block.timestamp
        });
        
        allRequestIds.push(_requestId);
        
        emit RescueResolved(_requestId, _volunteer, _volunteerName, _hoursWorked, block.timestamp);
    }
    
    // Mint a Soulbound Token (SBT) when ratings and feedback are submitted by the victim
    function mintSBT(
        address _volunteer,
        string calldata _volunteerName,
        string calldata _category,
        uint8 _rating,
        uint256 _hoursWorked,
        string calldata _feedback,
        string calldata _requestId
    ) external onlyOwner returns (uint256) {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        
        uint256 tokenId = nextTokenId++;
        
        soulboundTokens[tokenId] = SoulboundToken({
            tokenId: tokenId,
            volunteer: _volunteer,
            volunteerName: _volunteerName,
            category: _category,
            rating: _rating,
            hoursWorked: _hoursWorked,
            feedback: _feedback,
            timestamp: block.timestamp,
            requestId: _requestId
        });
        
        volunteerTokens[_volunteer].push(tokenId);
        
        // Update the rescue record if it exists
        if (rescueRecords[_requestId].timestamp > 0) {
            rescueRecords[_requestId].rating = _rating;
            rescueRecords[_requestId].feedback = _feedback;
        }
        
        emit SBTMinted(tokenId, _volunteer, _volunteerName, _rating, _hoursWorked, _requestId, block.timestamp);
        
        return tokenId;
    }
    
    // Enforce Soulbound (Non-Transferability) overrides
    // These functions simulate ERC721 signature but will revert if transfers are attempted
    function transferFrom(address, address, uint256) external pure {
        revert("SBT: Soulbound tokens are non-transferable");
    }
    
    function safeTransferFrom(address, address, uint256) external pure {
        revert("SBT: Soulbound tokens are non-transferable");
    }
    
    function safeTransferFrom(address, address, uint256, bytes calldata) external pure {
        revert("SBT: Soulbound tokens are non-transferable");
    }
    
    function approve(address, uint256) external pure {
        revert("SBT: Approvals not allowed for Soulbound tokens");
    }
    
    function setApprovalForAll(address, bool) external pure {
        revert("SBT: Approvals not allowed for Soulbound tokens");
    }
    
    // View functions
    function getVolunteerTokenCount(address _volunteer) external view returns (uint256) {
        return volunteerTokens[_volunteer].length;
    }
    
    function getVolunteerTokens(address _volunteer) external view returns (uint256[] memory) {
        return volunteerTokens[_volunteer];
    }
    
    function getRescueRecord(string calldata _requestId) external view returns (RescueRecord memory) {
        return rescueRecords[_requestId];
    }
}
