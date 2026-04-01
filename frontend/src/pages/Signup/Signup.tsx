import { PageTitle } from '@/components/PageTitle';
import { SignupHeader } from './components/SignupHeader';
import { SignupForm } from '@/forms/Signup';
import { SignupFooter } from './components/SignupFooter';

export const SignupPage = () => {
  return (
    <>
      <PageTitle pageName="Sign Up" />
      <div className="flex flex-1 items-start justify-center px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <div className="mx-auto w-100 max-w-md p-4">
          <SignupHeader />

          <hr className="border-border mb-10 border-t border-solid" />

          <SignupForm />
          <SignupFooter />
        </div>
      </div>
    </>
  );
};
