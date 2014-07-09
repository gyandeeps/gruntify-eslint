function getMessageType(message){
    if(message.fatal || message.severity === 2){
        return "Error";
    }
    else{
        return "Warning";
    }
}

module.exports = function(results){
    var output = "";
    var total = 0;

    results.forEach(function(result){
        var messages = result.messages;
        var messageType;

        total += messages.length;
        output += "<div style='margin-left: 20px;'> File Name : " + result.filePath + "</div>";
        output += "<table style='margin-left: 50px;'>";
        output += "<thead><tr><th>Line</th><th>Column</th><th>Type</th><th>Message</th><th>Rule</th></tr></thead>";
        messages.forEach(function(message){
            messageType = getMessageType(message);

            output += "<tr style='color:" + (messageType === "Error" ? "red" : "blue") + "';>";
            output += "<td style='padding: 4px 8px 4px 8px;'>" + (message.line || 0) + "</td>";
            output += "<td style='padding: 4px 8px 4px 8px;'>" + (message.column || 0) + "</td>";
            output += "<td style='padding: 4px 8px 4px 8px;'>" + messageType + "</td>";
            output += "<td style='padding: 4px 8px 4px 8px;'>" + message.message + "</td>";
            output += "<td style='padding: 4px 8px 4px 8px;'>" + (message.ruleId ? " (" + message.ruleId + ")" : "") + "</td>";
            output += "</tr>";
        });
        output += "</table>";
    });

    if(total > 0){
        output += "<div>" + total + " problem" + (total !== 1 ? "s" : "") + "</div>";
    }

    return output;
};
