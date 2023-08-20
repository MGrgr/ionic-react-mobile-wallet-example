export function alertAndLog(title: string, message: any) {
  setTimeout(async () => {
    alert(`${title}, ${message}`);
  }, 100);
  console.log(message);
}
