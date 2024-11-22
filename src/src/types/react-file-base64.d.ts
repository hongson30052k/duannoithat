declare module "react-file-base64" {
  interface FileBaseProps {
    type: "file";
    multiple?: boolean;
    onDone: (file: { base64: string }) => void;
  }

  const FileBase: React.FC<FileBaseProps>;
  export default FileBase;
}
