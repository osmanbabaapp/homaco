import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import Container from "../container";

const data: any = {
  tr: [
    {
      name: "Abdulwahid gap alhasan",
      role: "Genel Müdür",
      phone: "+90 534 872 80 00",
      plink: "00905348728000",
    },
    {
      name: "Muhammed Ahmet Fellaha",
      role: "Teknik Direktör",
      phone: "+90 538 548 86 66",
      plink: "00905385488666", //
    },
  ],
  en: [
    {
      name: "Abdulwahid gap alhasan",
      role: "General Director",
      phone: "+90 534 872 80 00",
      plink: "00905348728000",
    },
    {
      name: "Muhammed Ahmet Fellaha",
      role: "Technical Director",
      phone: "+90 534 872 80 00",
      plink: "00905385488666",
    },
  ],
  ar: [
    {
      name: "عبد الواحد غاب الحسن",
      role: "المدير العام",
      phone: "+90 534 872 80 00",
      plink: "00905348728000",
    },
    {
      name: "محمد أحمد فلاحة",
      role: "المدير الفني",
      phone: "+90 534 872 80 00",
      plink: "00905385488666",
    },
  ],
};

const FounderItem: FC<{ item: any }> = ({ item }) => {
  return (
    <div className="w-[300px] relative group overflow-hidden">
      <div className="absolute text-center top-full transition-all left-0 w-full p-2 border-[1px] border-primYellowHover bg-primYellowHover/30 backdrop-blur-sm group-hover:top-[calc(100%_-_100px)]">
        <h2 className="font-bold text-2xl">{item?.name}</h2>
        <p>{item?.role}</p>
        <a href={`tel:${item?.plink}`}>{item.phone}</a>
      </div>
      <Image
        src={
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
        }
        alt={"founder"}
        className={"w-full"}
        width={300}
        height={100}
      />
    </div>
  );
};
const Founders: FC = () => {
  const router = useRouter();
  const locale = router.locale;

  const __ = data[locale || "ar"];
  return (
    <div className="py-24 text-white">
      <Container>
        <h2 className="text-center text-4xl mb-5">Founders</h2>
        <div className="grid grid-cols-2">
          {__.map((item: any, index: number) => (
            <div key={index} className="flex justify-center">
              <FounderItem item={item} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Founders;
