import { Messages } from "@/components/messages";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      {children}
      <Messages />
    </>
  );
}
