module.exports = {
    name: "삭제",
    execute(message,args){
        if(isNaN(args[0])) return message.reply("올바른 값을 입력해주세요")
        const MessageCount = parseInt(args[0]);
        message.channel.bulkDelete(MessageCount).then((count)=>{
            message.channel.send(`성공적으로 ${count.size}개의 메시지를 삭제했습니다.`)
        }).catch((error)=>{
            message.reply(`오류가 발생했습니다.\n오류 내용 : ${error}`)
        })
    }
}