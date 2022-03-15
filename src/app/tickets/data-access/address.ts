import { IAddress } from "../utils/address.interface";

export const Data: IAddress[] = [
  {
    id: 1,
    governorate_name: "الجيزة",
    cities: [
      {
        governorate_id: 1,
        city_name: "الجيزة",
        district: ["الدقي", "المنيل", "المنيب", "السيدة زينب"],
      },
      {
        governorate_id: 1,
        city_name: "السادس من أكتوبر",
        district: ["الحصري", "مول العرب", "جامعة مصر"],
      },
      {
        governorate_id: 1,
        city_name: "الشيخ زايد",
        district: [
          "الحي الاول",
          "الحي الثاني",
          "الحي العاشر",
          "الجامعة الكندية",
          "مول المعز",
        ],
      },
    ],
  },
  {
    id: 2,
    governorate_name: "الغربية",
    cities: [
      {
        governorate_id: 2,
        city_name: "طنطا",
        district: [
          "جامعة طنطا",
          "سبربيه",
          "السيد البدوي",
          "المحطة",
          "شارع البحير ",
          "شارع سعيد ",
        ],
      },
      {
        governorate_id: 2,
        city_name: "كفر الزيات",
        district: ["الموقف", "محطة كفر الزيات", "الاسعاف", "محكة كفر الزيات"],
      },
    ],
  },
  {
    id: 3,
    governorate_name: "البحيرة",
    cities: [
      {
        governorate_id: 3,
        city_name: "كوم حمادة",
        district: ["النجيلة", "بريم", "زاوية البحر", "القناطر", " محلة احمد "],
      },
      {
        governorate_id: 3,
        city_name: "دمنهور",
        district: ["ادكو", "محطة دمنهور", "زاوية فريج", "مصطفي الخليل"],
      },
    ],
  },
];
