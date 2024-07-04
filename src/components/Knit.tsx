import { Fragment, useEffect, useRef } from "react";
interface KnitAuthProps {
  category?: string;
  apps?: string[];
  btnString?: string;
}
function KnitAuth(props: KnitAuthProps) {
  const knitRef = useRef<HTMLElement>(null);
  // Backend call to generate & get the authSessionToken
  const newSessionFn = (e?: CustomEvent) => {
    console.log(" new session fn called");
    e?.preventDefault();
    // Hit the backend to generate authSessionToken
    let filters: Record<string, any> = {};
    if (props.category) {
      filters["category"] = props.category;
    }
    if (props?.apps?.length) {
      filters["apps"] = props.apps;
    }
    let data: Record<string, any> = {
      originOrgId: "scrut",
      originUserEmail: "scrut@scrut.com",
      originOrgName: "scrut.dev",
      originUserName: "Piyush Gupta",
      clearErrors: true,
      // filters: [
      //   {
      //     category: "HRIS",
      //     apps: ["keka"]
      //   }
      // ]
    };
    if (Object.keys(filters).length) {
      data["filters"] = [filters];
    }
    // axios.get
    fetch(`https://frontend-engine.sandbox.getknit.dev/auth.createSessionV3`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((r) => {
        // UI Auth component won't open with a empty session token
        knitRef?.current?.setAttribute("authsessiontoken", r.msg.token);

        // Set skipIntro attribute to disable the introduction screen
        // knitRef?.current?.setAttribute("skipIntro",'');
      })

      .catch((err: any) => {
        console.error(err);
      });
  };

  // Upon finishing the integration flow
  const onFinishFn = (e: CustomEvent) => {
    e?.preventDefault();
    console.log(e["detail"]["integration-id"]);
  };

  // Upon deactivate of integration
  const onDeactivateFn = (e: CustomEvent) => {
    e?.preventDefault();
    console.log(e["detail"]["integrationDetails"]);
  };

  // Upon closing of the knit-auth component
  const onKnitCloseFn = (e: CustomEvent) => {
    e?.preventDefault();
    console.log(e["detail"]["knitClosed"]);
  };

  useEffect(() => {
    // Assign functions to event listeners for onNewSession and onFinish events.
    knitRef.current?.addEventListener("onNewSession", ((
      event?: CustomEvent
    ) => {
      newSessionFn(event);
    }) as EventListener);

    knitRef.current?.addEventListener("onFinish", ((event: CustomEvent) => {
      onFinishFn(event);
    }) as EventListener);

    knitRef.current?.addEventListener("onDeactivate", ((event: CustomEvent) => {
      onDeactivateFn(event);
    }) as EventListener);

    knitRef.current?.addEventListener("onKnitClose", ((event: CustomEvent) => {
      onKnitCloseFn(event);
    }) as EventListener);

    // Set the token once the component has mounted
    newSessionFn();

    return () => {
      // Remove events listeners on unmount
      knitRef.current?.removeEventListener("onNewSession", ((
        event?: CustomEvent
      ) => {
        newSessionFn(event);
      }) as EventListener);
      knitRef.current?.removeEventListener("onFinish", ((
        event: CustomEvent
      ) => {
        onFinishFn(event);
      }) as EventListener);
      knitRef.current?.removeEventListener("onDeactivate", ((
        event: CustomEvent
      ) => {
        onDeactivateFn(event);
      }) as EventListener);
      knitRef.current?.removeEventListener("onKnitClose", ((
        event: CustomEvent
      ) => {
        onKnitCloseFn(event);
      }) as EventListener);
    };
  }, []);

  return (
    <knit-auth ref={knitRef} sandbox={true}>
      <button slot="trigger">
        {props?.btnString ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{props?.btnString}</span>{" "}
            {props?.apps?.length ? (
              <Fragment>
                &nbsp;&nbsp;
                <img
                  src={`https://d2mk0xd61wwcji.cloudfront.net/ui-auth-component/app_logos/short/${props.apps[0]}.svg`}
                  alt={props.apps[0]}
                />
              </Fragment>
            ) : (
              <></>
            )}
          </div>
        ) : (
          "Open Knit"
        )}
      </button>
    </knit-auth>
  );
}

export default KnitAuth;
