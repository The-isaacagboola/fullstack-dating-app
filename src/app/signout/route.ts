import { signOutUser } from "../actions/authActions";
import { NextResponse } from "next/server";

export async function GET() {
  await signOutUser();
  return NextResponse.redirect("/");
}
