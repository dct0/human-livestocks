import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type MessageProps = {
  author: {
    username: string;
    iconURL: string;
  };
  createdAt: Date;
  content: string;
};

export default function Message({ author, content, createdAt }: MessageProps) {
  return (
    <article className="bg-discord-gray hover:bg-discord-gray-hover flex gap-3 py-2 pl-4 pr-6 first:rounded-t-lg first:pt-4 last:rounded-b-lg last:pb-4">
      <Avatar className="mt-1">
        <AvatarImage src={author.iconURL} alt={`@${author.username} `} />
        <AvatarFallback>{getInitials(author.username)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center">
          <h3 className="font-bold text-gray-100">{author.username}</h3>
          <span className="ml-2 text-gray-500">
            {createdAt.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-100">{content}</p>
      </div>
    </article>
  );
}
