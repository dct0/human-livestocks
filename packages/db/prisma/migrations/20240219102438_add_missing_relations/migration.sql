-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
