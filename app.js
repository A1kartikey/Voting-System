$(document).ready(() => {
  hideall();
  $(".spinner").hide();
  $("#votediv").show();
});

let hideall = () => {
  $("#enrollcandidatediv").hide();
  $("#enrollvoterdiv").hide();
  $("#getvoterdetailsdiv").hide();
  $("#votediv").hide();
  $("#getvotecountdiv").hide();
  $("#getvoterlistdiv").hide();
  $("#getcandidatelistdiv").hide();
  $("#getcandidatedetailsdiv").hide();
};

let showTarget = (id) => {
  console.log(id);
  hideall();
  $("#" + id + "div").show();
  switch (id) {
    case "getcandidatelist":
      getCandidateList();
    case "getvoterlist":
      getVoterList();
  }
};

$(".info").click((x) => {
  hideall();
  let divId = x.currentTarget.id;
  $("#" + divId + "div").show();
});

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

console.log(web3.eth.accounts[0]);
console.log(web3.eth.Balance);

var votingContract = web3.eth.contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_voterId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "enrollCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_voterId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "enrollVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateVoterId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_votersVoterId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_voterId",
				"type": "uint256"
			}
		],
		"name": "getCandidateDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_voterId",
				"type": "uint256"
			}
		],
		"name": "getVotecountOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_voterId",
				"type": "uint256"
			}
		],
		"name": "getVoterDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoterList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]);

var Vote = votingContract.at("0x538fDeA1C56b2bB09109bffd45f41122869411Fa");

$("#button_enrollCandidate").click(function () {
  $(".spinner").show();
  console.log(
    $("#ec_VoterId").val(),
    $("#ec_VoterName").val(),
    $("#ec_VoterAge").val()
  );
  Vote.enrollCandidate(
    $("#ec_VoterId").val(),
    $("#ec_VoterName").val(),
    $("#ec_VoterAge").val(),
    (err, res) => {
      if (res) {
        $(".spinner").hide();
        $("#ec_VoterId").val("");
        $("#ec_VoterName").val("");
        $("#ec_VoterAge").val("");
        console.log(res);
      }
      if (err) {
        $(".spinner").hide();
        console.log(err);
      }
    }
  );
});

$("#button_enrollVoter").click(function () {
  console.log(
    $("#ev_VoterId").val(),
    $("#ev_VoterName").val(),
    $("#ev_VoterAge").val()
  );
  Vote.enrollVoter(
    $("#ev_VoterId").val(),
    $("#ev_VoterName").val(),
    $("#ev_VoterAge").val(),
    (err, res) => {
      if (res) {
        $(".spinner").hide();
        $("#ev_VoterId").val("");
        $("#ev_VoterName").val("");
        $("#ev_VoterAge").val("");
        console.log(res);
      }
      if (err) {
        $(".spinner").hide();
        console.log(err);
      }
    }
  );
});

var getVoterDetails = () => {
  Vote.getVoterDetails($("#gvd_VoterId").val(), function (error, result) {
    console.log(result);
    if (!error) {
      $("#voterdetails")
        .empty()
        .html(
          "<td>" +
            result[0] +
            "</td>" +
            "<td>" +
            result[1] +
            "</td>" +
            "<td>" +
            result[2] +
            "</td>" +
            "<td>" +
            result[3] +
            "</td>"
        );
    } else console.log(error);
  });
};

let getCandidateDetails = () => {
  Vote.getCandidateDetails($("#gcd_VoterId").val(), function (error, result) {
    if (!error) {
      $("#candidatedetails")
        .empty()
        .html(
          "<td>" +
            result[0] +
            "</td>" +
            "<td>" +
            result[1] +
            "</td>" +
            "<td>" +
            result[2] +
            "</td>" +
            "<td>" +
            result[3] +
            "</td>"
        );
    } else console.log(error);
  });
};

var getVoteCount = () => {
  console.log("in votecpunt");
  Vote.getCandidateDetails($("#gvc_CandiadteId").val(), function (
    error,
    result
  ) {
    console.log(result);
    if (!error) {
      $("#votecount").empty().html(result[3].c);
    } else console.log(error);
  });
  //   Vote.getVotecountOf($("#gvc_CandiadteId").val(), function (error, result) {
  //       console.log(result);
  //     if (!error) {
  //       $("#votecount").empty().html(result.c);
  //     } else console.log(error);
  //   });
};

var processVote = () => {
  Vote.vote(
    $("#vote_CandiadteId").val(),
    $("#vote_VoterId").val(),
    (err, res) => {
      if (res) {
        $(".spinner").hide();
        $("#vote_CandiadteId").val("");
        $("#vote_VoterId").val("");
        console.log(res);
      }
      if (err) {
        console.log(err);
        $(".spinner").hide();
      }
    }
  );
};

let getVoterList = () => {
  Vote.getVoterList(function (error, result) {
    $("#listvoters").empty();
    $("#listvoters").append(
      '<a class="list-group-item list-group-item-action active" href="#" >List Of Voters</a>'
    );
    if (!error) {
      for (i = 0; i < result.length; i++) {
        $("#listvoters").append(
          '<a class="list-group-item list-group-item-action" href="#" >' +
            result[i] +
            "</a>"
        );
        // console.log(result[i]);
      }
    } else console.log(error);
  });
};

let getCandidateList = () => {
  Vote.getCandidateList(function (error, result) {
    $("#listcandidates").empty();
    $("#listcandidates").append(
      '<a class="list-group-item list-group-item-action active" href="#" >List Of Candidates</a>'
    );
    if (!error) {
      for (i = 0; i < result.length; i++) {
        $("#listcandidates").append(
          '<a class="list-group-item list-group-item-action" href="#" >' +
            result[i] +
            "</a>"
        );
        console.log(result[i]);
      }
    } else console.log(error);
  });
};
